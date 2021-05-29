import React, { useState } from "react";
import "../Navbar.css"
import { useAuth } from "../contexts/AuthContext"
import Avatar from '@material-ui/core/Avatar';
import NotificationsIcon from '@material-ui/icons/Notifications';
import {TestDropdownMenu} from "./DropdownMenu"
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import {Link, useHistory} from "react-router-dom"
import Notifications from "./Notifications"
import MenuItem from '@material-ui/core/MenuItem';
import Bean from "../bean.png"

function NavBar(){
    const {currentUser} = useAuth()
    const {logout} = useAuth()
    const [error, setError] =useState("")
    const history = useHistory()

    async function handleLogout(){
        setError("")
        try{
            await logout()
            history.push("/login")
        } catch{
            setError("Failed to logout")
        }
    }
    
    
    return(
        <nav className="navbar">
        <Avatar src={Bean} />
        <p className="navbar-logo">muggers</p>
            {currentUser && <ul className="navbar-nav">
                <TestDropdownMenu Icon={NotificationsIcon}>
                    <MenuItem style={{width:"300px", whiteSpace:"unset", wordBreak:"break-all"}}>
                        <Notifications />
                    </MenuItem>
                </TestDropdownMenu>
                <TestDropdownMenu Icon={Avatar} src={currentUser.photoURL}>
                    <MenuItem>
                        <AccountBoxIcon/>
                        <Link className="link" to="/update-profile">Update Profile</Link>
                    </MenuItem>
                    <MenuItem>
                        <ExitToAppIcon/>
                        <div className="link" onClick={handleLogout}>Logout</div>
                    </MenuItem>
                   
                </TestDropdownMenu>
                
            </ul>}
        </nav>
    )

}

export default NavBar;