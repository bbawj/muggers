import React, { useEffect, useState } from "react";
import "./Navbar.css"
import { useAuth } from "../../contexts/AuthContext"
import Avatar from '@material-ui/core/Avatar';
import NotificationsIcon from '@material-ui/icons/Notifications';
import {TestDropdownMenu} from "./DropdownMenu"
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import {Link, useHistory} from "react-router-dom"
import Notifications from "./Notifications"
import MenuItem from '@material-ui/core/MenuItem';
import Bean from "../../bean.png"

function NavBar(){
    const {currentUser} = useAuth()
    const {logout} = useAuth()
    const [error, setError] =useState("")
    const history = useHistory()
    const [url, setUrl] = useState("")

    async function handleLogout(){
        setError("")
        try{
            await logout()
            history.push("/login")
        } catch{
            setError("Failed to logout")
        }
    }
    
    useEffect(() => {
        if (currentUser){
            setUrl(currentUser.photoURL)
        }
    }, [])
    
    return(
        <nav className="navbar">
        <Avatar src={Bean} style={{marginLeft:"10px"}} />
        <p className="navbar-logo"><Link to="/dashboard">muggers</Link></p>
            {currentUser && <ul className="navbar-nav">
                <TestDropdownMenu Icon={NotificationsIcon}>
                    <MenuItem style={{width:"300px", whiteSpace:"unset"}}>
                        <Notifications />
                    </MenuItem>
                </TestDropdownMenu>
                <TestDropdownMenu Icon={Avatar} src={url}>
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