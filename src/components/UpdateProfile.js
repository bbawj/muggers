import React, {useRef, useState} from 'react'
import Alert from '@material-ui/lab/Alert';
import "../Signup.css"
import { useAuth } from "../contexts/AuthContext"
import { Link, useHistory } from 'react-router-dom'

function UpdateProfile() {
    const emailRef = useRef()
    const passwordRef = useRef()
    const passwordConfirmRef = useRef()
    const {currentUser, updatePassword, updateEmail} = useAuth()
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const history = useHistory()

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

    return (
        <div className="signup-container">
        
        <div className="signup-container-rec1">
            <h1 style={{fontSize: "4rem"}}>Update Profile</h1>
            {error && (<Alert severity="error">{error}</Alert>)}
            <form onSubmit={handleSubmit}>
                <input className="email" type="text" placeholder="Email" ref={emailRef} required defaultValue={currentUser.email}/>
                <input className="password" type="password" placeholder="Leave blank to keep the same" ref={passwordRef}  />
                <input className="password" type="password" placeholder="Leave blank to keep the same" ref={passwordConfirmRef} />
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
