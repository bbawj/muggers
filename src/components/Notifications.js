import React, { useState, useEffect } from 'react'
import { db } from '../firebase'
import {useAuth} from "../contexts/AuthContext"
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import ClearIcon from '@material-ui/icons/Clear';
import CheckIcon from '@material-ui/icons/Check';
import Tooltip from '@material-ui/core/Tooltip';
import "../Navbar.css"

function Notifications() {

    const { currentUser } = useAuth()
    const [notifications, setNotifications] = useState([])

    function FriendNotificationItem({id, sender, photo}){

        async function read(){
            try{
                await db.collection("notifications").doc(id).update({ read:true })
            } catch(err){
                console.log(err)
            }
        }

        async function handleAccept(){

        }

        function handleDecline(){
            
        }

        return (
            <div className="notif" onClick={read}>
            
                <Avatar src={photo} alt={sender} style={{marginRight:"10px"}}/>
                <Tooltip title="Click to mark as read" placement="top">
                <span>{sender} sent a friend request</span>
                </Tooltip>
                  
                <Tooltip title="Accept" placement="top">
                    <IconButton>
                    <CheckIcon color="primary" onClick={handleAccept}/>
                    </IconButton>
                </Tooltip>
                <Tooltip title="Decline" placement="top">
                    <IconButton>
                    <ClearIcon color="secondary" onClick={handleDecline}/>
                    </IconButton>
                </Tooltip>
            </div>
        )
    }
    
    useEffect(() => {
        
        async function fetchNotifs(){
            try{
                const ref = db.collection("notifications")
                const query = await ref.where("receiver", "==", currentUser.displayName).orderBy("created_at", "desc").limit(5).get()
                
                setNotifications(query.docs.map( (doc) => {
                        return {
                            id: doc.id,
                            type: doc.data().type,
                            sender: doc.data().sender,
                            photo: doc.data().photoURL
                        }
                    })
                )
            } catch (err){
                console.log(err)
            }
            
            
        }
        fetchNotifs()
    }, [])

    return (
        <div>
            {notifications.map(notif => {
                    if (notif.type==="friend"){
                        return <FriendNotificationItem key={notif.id} id={notif.id} sender={notif.sender} photo={notif.photo} />
                    }
                })}
        </div>
    )
}

export default Notifications
