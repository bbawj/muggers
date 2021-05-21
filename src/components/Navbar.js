import React from "react";
import "../Navbar.css"
import { useAuth } from "../contexts/AuthContext"
import NavBarItem from "./NavBarItem";
import Avatar from '@material-ui/core/Avatar';
import NotificationsIcon from '@material-ui/icons/Notifications';
import DropdownMenu from "./DropdownMenu"

function NavBar(){
    const {currentUser} = useAuth()
  
    return(
        <nav className="navbar">
        <p className="navbar-logo">muggers</p>
            {currentUser && <ul className="navbar-nav">
                <NavBarItem Icon={NotificationsIcon}/>
                <NavBarItem Icon={Avatar}>
                    <DropdownMenu />
                </NavBarItem>
                
            </ul>}
        </nav>
    )

}

export default NavBar;