import React, { useEffect, useState } from "react";
import {db} from "../firebase"
import "../Navbar.css"
import { useAuth } from "../contexts/AuthContext"
import NavBarItem from "./NavBarItem";
import Avatar from '@material-ui/core/Avatar';
import NotificationsIcon from '@material-ui/icons/Notifications';
import {DropdownMenu, DropdownItem, TestDropdownMenu} from "./DropdownMenu"
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import {Link, useHistory} from "react-router-dom"
import Notifications from "./Notifications"
import MenuItem from '@material-ui/core/MenuItem';

function NavBar(){
    const {currentUser} = useAuth()
    const {logout} = useAuth()
    const [error, setError] =useState("")
    const [friendnotif, setFriendNotif] = useState([])
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
        <p className="navbar-logo">muggers</p>
            {currentUser && <ul className="navbar-nav">
                <TestDropdownMenu Icon={NotificationsIcon}>
                    <MenuItem style={{width:"550px"}}>
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