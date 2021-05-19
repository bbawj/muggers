import React, {useRef, useState} from 'react'
import {Alert} from "react-bootstrap"
import "../Signup.css"
import { useAuth } from "../contexts/AuthContext"
import { Link } from 'react-router-dom'

function ForgotPassword() {
    const emailRef = useRef()
    const {resetPassword} = useAuth()
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState("")

    async function handleSubmit(event){
        event.preventDefault()

        try{
            setMessage("")
            setError("")
            setLoading(true)
            await resetPassword(emailRef.current.value)
            setMessage("Check your inbox for futher instructions")
        } catch{
            setError("Failed to reset password")
        }
        setLoading(false)
    }

    return (
        <div className="signup-container">
        
        <div className="signup-container-rec1">
            <h1 style={{fontSize: "4rem"}}>Password Reset</h1>
            {error && (<Alert style={{color:"red", fontSize:"1.5rem"}} variant="danger">{error}</Alert>)}
            {message && (<Alert style={{color:"green", fontSize:"1.5rem"}} variant="success">{message}</Alert>)}
            <form onSubmit={handleSubmit}>
                <input className="email" type="text" placeholder="Email" ref={emailRef}/>

                <button disabled={loading} type="submit">Reset Password</button>
            </form>
            <div>
                <Link className="signup-login" to="/login">Login</Link>
            </div>
            <div>
                Need an account? <Link className="signup-login" to="/signup">Sign Up.</Link>
            </div>
            
        </div>
        </div>
    )
}

export default ForgotPassword
