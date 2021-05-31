import React, {useRef, useState} from 'react'
import Alert from '@material-ui/lab/Alert';
import "./Signup.css"
import { useAuth } from "../../contexts/AuthContext"
import { Link, useHistory } from 'react-router-dom'

function Login() {
    const emailRef = useRef()
    const passwordRef = useRef()
    const {login} = useAuth()
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const history = useHistory()

    async function handleSubmit(event){
        event.preventDefault()

        try{
            setError("")
            setLoading(true)
            await login(emailRef.current.value, passwordRef.current.value)
            history.push("/dashboard")
        } catch{
            setError("Failed to log in")
        }
        setLoading(false)
    }
    

    return (
        <div className="signup-container">
        
        <div className="signup-container-rec1">
            <h1>Log In</h1>
            
            <h2>Sign in to your account</h2>
            {error && (<Alert severity="error">{error}</Alert>)}
            <form onSubmit={handleSubmit}>
                <input className="email" type="text" placeholder="Email" ref={emailRef} required/>
                <input className="password" type="password" placeholder="Password" ref={passwordRef} required/>
                <button disabled={loading} type="submit">Log In</button>
            </form>
                <Link className="forgot-password" to="/forgot-password">Forgot Password?</Link>
            <div>
                Need an account? <Link to="/signup">Sign Up.</Link>
            </div>
            
        </div>
        </div>
    )
}

export default Login
