import React, { useState } from 'react'
import { useAuth } from "../contexts/AuthContext"
import "../Navbar.css"
import {Link, useHistory} from "react-router-dom"
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import AccountBoxIcon from '@material-ui/icons/AccountBox';

function DropdownMenu() {

    const {logout} = useAuth()
    const [error, setError] =useState("")
    const history = useHistory()

    function DropdownItem(props) {
        return (
          <a href={props.lin} className="menu-item">
            <span className="icon-button"><props.leftIcon/></span>
            {props.children}
            <span className="icon-right">{props.rightIcon}</span>
          </a>
        );
      }

    async function handleLogout(){
        setError("")
        try{
            await logout()
            history.push("/login")
        } catch{
            setError("Failed to logout")
        }
    }

    return (
        <div className="dropdown">
            <DropdownItem leftIcon={AccountBoxIcon} lin={"/update-profile"}><Link className="link" to="/update-profile">Update Profile</Link></DropdownItem>
            <DropdownItem leftIcon={ExitToAppIcon}><div className="link" onClick={handleLogout}>Logout</div></DropdownItem>
        </div>
    )
}

export default DropdownMenu
