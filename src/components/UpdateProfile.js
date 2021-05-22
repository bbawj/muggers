import React, {useRef, useState} from 'react'
import { useAuth } from "../contexts/AuthContext"
import { Link, useHistory } from 'react-router-dom'
import "../Signup.css"
import Avatar from '@material-ui/core/Avatar';
import Alert from '@material-ui/lab/Alert';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import Tooltip from '@material-ui/core/Tooltip';
import { db, storage } from "../firebase"

function UpdateProfile() {
    const emailRef = useRef()
    const passwordRef = useRef()
    const passwordConfirmRef = useRef()
    const {currentUser, updatePassword, updateEmail} = useAuth()
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const history = useHistory()
    const [imageurl, setImageUrl] = useState(currentUser.photoURL)

    function handleSubmit(event){
        event.preventDefault()
        if (passwordRef.current.value !== passwordConfirmRef.current.value){
            return setError("Passwords do not match")
        }

        const promises = []
        setLoading(true)
        setError("")
    
        if (emailRef.current.value !== currentUser.email) {
          promises.push(updateEmail(emailRef.current.value))
        }
        if (passwordRef.current.value) {
          promises.push(updatePassword(passwordRef.current.value))
        }
    
        Promise.all(promises)
          .then(() => {
            history.push("/")
          })
          .catch(() => {
            setError("Failed to update account")
          })
          .finally(() => {
            setLoading(false)
          })
      }

    // get invisible input
    function handleEditPicture(){
      const fileInput = document.getElementById("imageInput")
      fileInput.click()
    }
    
    // send image to firebase
    async function handleImageChange(event){
      const image = event.target.files[0]
      const current_img = currentUser.photoURL
      try{
        setError("")
        const task_ref = storage.ref().child("profile_pictures/" + image.name)
        const upload = task_ref.put(image)
        const url =  task_ref.getDownloadURL()
        const update = currentUser.updateProfile({ photoURL: url })
        const updateDB = db.collection("users").doc(currentUser.uid).set({photoURL: url})
        await Promise.all([upload,url,update, updateDB])
        if (current_img){
          await storage.refFromURL(current_img).delete()
        }
        setImageUrl(url)      
      } catch(err){
  
        setError("Failed to change profile picture")
      } 
      
    }

    return (
        <div className="signup-container">

        <div className="signup-container-rec1">
            <h1 style={{fontSize: "4rem"}}>Update Profile</h1>
            <div className="avatar">
            <Avatar style={{width:"200px", height:"200px"}} alt={currentUser.displayName} src={imageurl}/>
            <input type="file" id="imageInput" onChange={handleImageChange} hidden="hidden" />
            <Tooltip title="Edit profile picture" placement="bottom">
              <IconButton onClick={handleEditPicture} size="small">
                <EditIcon/>
              </IconButton>
            </Tooltip>
            </div>
            {error && (<Alert severity="error">{error}</Alert>)}
            <form onSubmit={handleSubmit}>
                <input className="email" type="text" placeholder="Email" ref={emailRef} required defaultValue={currentUser.email}/>
                <input className="password" type="password" placeholder="Password: Leave blank to keep the same" ref={passwordRef}  />
                <input className="password" type="password" placeholder="Confirm Password: Leave blank to keep the same" ref={passwordConfirmRef} />
                <button disabled={loading} type="submit">Update</button>
            </form>
            
            <div className="signup-login">
                <Link to="/">Cancel</Link>
            </div>
            
        </div>
        </div>
    )
}

export default UpdateProfile
