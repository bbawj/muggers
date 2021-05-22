import React, { useEffect, useState } from "react";
import {db} from "../firebase"
import "../Navbar.css"
import { useAuth } from "../contexts/AuthContext"
import NavBarItem from "./NavBarItem";
import Avatar from '@material-ui/core/Avatar';
import NotificationsIcon from '@material-ui/icons/Notifications';
import {DropdownMenu, DropdownItem} from "./DropdownMenu"
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import {Link, useHistory} from "react-router-dom"


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
    
    useEffect(() => {
        if (currentUser){
            const ref = db.collection("users").doc(currentUser.uid)
            ref.get().then(doc => {
                setFriendNotif(doc.data().friend_req_rec)
            })
            
        }
        
    }, [])

    return(
        <nav className="navbar">
        <p className="navbar-logo">muggers</p>
            {currentUser && <ul className="navbar-nav">
                <NavBarItem Icon={NotificationsIcon}>
                    <DropdownMenu>
                        {friendnotif && friendnotif.map((text) => <DropdownItem>{text} has sent a friend request</DropdownItem>)}
                    </DropdownMenu>
                </NavBarItem>
                <NavBarItem Icon={Avatar} src={currentUser.photoURL}>
                    <DropdownMenu>
                        <DropdownItem leftIcon={<AccountBoxIcon/>} lin={"/update-profile"}><Link className="link" to="/update-profile">Update Profile</Link></DropdownItem>
                        <DropdownItem leftIcon={<ExitToAppIcon/>}><div className="link" onClick={handleLogout}>Logout</div></DropdownItem>
                    </DropdownMenu>
                </NavBarItem>
                
            </ul>}
        </nav>
    )

}

export default NavBar;