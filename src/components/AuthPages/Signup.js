import React, {useRef, useState} from 'react'
import Alert from '@material-ui/lab/Alert';
import "./Signup.css"
import { useAuth } from "../../contexts/AuthContext"
import { Link, useHistory } from 'react-router-dom'

function Signup() {
    const emailRef = useRef()
    const passwordRef = useRef()
    const passwordConfirmRef = useRef()
    const {signup} = useAuth()
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const history = useHistory()

    async function handleSubmit(event){
        event.preventDefault()
        if (passwordRef.current.value !== passwordConfirmRef.current.value){
            return setError("Passwords do not match")
        }

        try{
            setError("")
            setLoading(true)
            await signup(emailRef.current.value, passwordRef.current.value)
            history.push("/username")
        } catch{
            setError("Failed to create an account")
        }
        setLoading(false)
    }

    return (
        <div className="signup-container">
        
        <div className="signup-container-rec1">
            <h1>Sign up</h1>
            
            <h2>Create new account</h2>
            {error && (<Alert severity="error">{error}</Alert>)}
            <form onSubmit={handleSubmit}>
                <input className="email" type="text" placeholder="Email" ref={emailRef} required/>
                <input className="password" type="password" placeholder="Password" ref={passwordRef} required/>
                <input className="password" type="password" placeholder="Confirm Password" ref={passwordConfirmRef} required/>
                <button disabled={loading} type="submit">Sign Up</button>
            </form>
            
            <div >
                Already have an account? <Link style={{textDecoration:"underline"}} to="/login">Log In.</Link>
            </div>
            
        </div>
        </div>
    )
}

export default Signup
