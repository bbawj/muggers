import React, { useState } from "react";
import "../Header.css"
import { useAuth } from "../contexts/AuthContext"
import {Link, useHistory} from "react-router-dom"

function Navbar(){
    const {currentUser, logout} = useAuth()
    const [error, setError] =useState("")
    const history = useHistory()

    async function handleLogout(){
        setError("")
        try{
            await logout()
            history.pushState("/login")
        } catch{
            setError("Failed to logout")
        }
    }
    return(
        <div className="navbar">
        <ul>
            <li style={{flex:8}}>muggers</li>
            {!currentUser && <li style={{flex:1}}><Link className="link" to="/signup">Sign Up</Link></li>}
            {!currentUser && <li style={{flex:1}}><Link className="link" to="/login">Login</Link></li>}
            {currentUser && <li style={{flex:2}}><Link className="link" to="/update-profile">Update Profile </Link></li>}
            {currentUser && <li style={{flex:1}}><div className="link" onClick={handleLogout}>Logout</div></li>}
            
        </ul>
        </div>
    )

}

export default Navbar;