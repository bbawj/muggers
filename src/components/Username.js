import React, {useEffect, useRef, useState} from 'react'
import "../Signup.css"
import { useAuth } from "../contexts/AuthContext"
import { useHistory } from 'react-router-dom'
import { db } from '../firebase'

function Username() {
    const usernameRef = useRef()
    const [currentUsernames, setCurrentUsernames] = useState([])
    const { currentUser, updateProfile } = useAuth()
    const [avail, setAvail] = useState(false)
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const history = useHistory()

    async function handleSubmit(event){
        event.preventDefault()

        const inputUsername = usernameRef.current.value

        try{
            setError("")
            setLoading(true)
            const batch = db.batch()
            batch.set(db.collection("usernames").doc(inputUsername),{
                id: currentUser.uid
            } )
            batch.set(db.collection('users').doc(currentUser.uid), {
                username: inputUsername
            })
            batch.set(db.collection("friends").doc(inputUsername), {
                lastPost:"",
                recentPosts: [],
                users: [],
                //isOnline: true
            })
            await batch.commit()
            await updateProfile(inputUsername)
            alert("Username successfully set!")
            history.push("/dashboard")
         
        } catch(error) {
            
            setError("Failed to create username")
        }
        setLoading(false)
    }

    function checkUsername(event){
        const username = event.target.value

       if (currentUsernames.includes(username)){
           setAvail(false)
           setError(`${username} already taken`)
       } else{
           setAvail(true)
           setError(`${username} is available`)
       }
    }

    useEffect(() => {
        const unsubscribe = db.collection('usernames').onSnapshot(snapshot => {
            setCurrentUsernames(snapshot.docs.map(doc => doc.id))
        })
        return unsubscribe
    }, [])


    return (
        <div className="signup-container">
        
        <div className="signup-container-rec1">
            <h1 style={{fontSize:"3.25rem"}}>Enter a username</h1>
            {error && (<p style={avail ? {color:"green"} : {color:"red"}}>{error}</p>)}
            <form onSubmit={handleSubmit}>
                <input onChange={checkUsername} className="email" type="text" placeholder="Username" ref={usernameRef} required/>
                <button disabled={!avail || loading} type="submit">Finish</button>
            </form>
            
        </div>
        </div>
    )
}

export default Username
