import React, { useState, useEffect } from 'react'
import { db } from '../firebase'
import firebase from "firebase/app";
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

    function FriendNotificationItem({id, sender, sender_id}){

        const [url, setUrl] = useState("")
        const [message, setMessage] = useState("")
        
        async function read(){
            try{
                await db.collection("notifications").doc(id).update({ read:true })
            } catch(err){
                console.log(err)
            }
        }

        async function handleAccept(){
            // add to friends-doc user array ; update request arrays; delete notification;
            try{
                const batch = db.batch()
                batch.update(db.collection("friends").doc(currentUser.displayName),{users: firebase.firestore.FieldValue.arrayUnion(sender)} )
                batch.update(db.collection("friends").doc(sender),{users: firebase.firestore.FieldValue.arrayUnion(currentUser.displayName)} )
                batch.update(db.collection("users").doc(currentUser.uid),{friend_req_rec: firebase.firestore.FieldValue.arrayRemove(sender)} )
                batch.update(db.collection("users").doc(sender_id), {friend_req_sent: firebase.firestore.FieldValue.arrayRemove(currentUser.displayName)})
                batch.delete(db.collection("notifications").doc(id))
                await batch.commit()
                setMessage(`You have accepted ${sender}'s friend request`)
            } catch(err){
                console.log(err)
            }         
        }

        function handleDecline(){

        }

        useEffect(() => {
            async function getPhoto(){
                const photo = await db.collection("users").doc(sender_id).get()
                setUrl(photo.data().photoURL)
            }
            getPhoto()
        }, [])

        return (
            <div className="notif" onClick={read}>
            
                <Avatar src={url} alt={sender} style={{marginRight:"10px"}}/>
                {message ? <span className="notification-response">{message}</span>: <div>
                <Tooltip title="Click to mark as read" placement="top">
                <span>{sender} sent a friend request</span>
                </Tooltip>
                  
                <Tooltip title="Accept" placement="top">
                    <IconButton onClick={handleAccept}>
                    <CheckIcon color="primary"/>
                    </IconButton>
                </Tooltip>
                <Tooltip title="Decline" placement="top">
                    <IconButton onClick={handleDecline}>
                    <ClearIcon color="secondary"/>
                    </IconButton>
                </Tooltip>
                </div>}
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
                        sender: doc.data().sender.username,
                        sender_id: doc.data().sender.id
                    }
                }))
                
            } catch (err){
                console.log(err)
            }
        }
        fetchNotifs()
    }, [])

    return (
        <div>
            {notifications && <span>No new notifications</span> }
            {notifications.map(notif => {
                    if (notif.type==="friend"){
                        return <FriendNotificationItem key={notif.id} id={notif.id} sender={notif.sender} sender_id={notif.sender_id} />
                    }
                })}
        </div>
    )
}

export default Notifications
