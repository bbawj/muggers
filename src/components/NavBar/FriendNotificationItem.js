import React, { useState, useEffect } from 'react'
import { db } from '../../firebase'
import firebase from "firebase/app";
import { useAuth } from '../../contexts/AuthContext';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import ClearIcon from '@material-ui/icons/Clear';
import CheckIcon from '@material-ui/icons/Check';
import Tooltip from '@material-ui/core/Tooltip';
import "./Navbar.css"


function FriendNotificationItem({id, sender, sender_id}){

    const [url, setUrl] = useState("")
    const [message, setMessage] = useState("")
    const { currentUser } = useAuth()
    
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
            batch.update(db.collection("friends").doc(currentUser.displayName),{users: firebase.firestore.FieldValue.arrayUnion(sender_id)} )
            batch.update(db.collection("friends").doc(sender),{users: firebase.firestore.FieldValue.arrayUnion(currentUser.uid)} )
            batch.update(db.collection("users").doc(sender_id), {friend_req_sent: firebase.firestore.FieldValue.arrayRemove(currentUser.displayName)})
            batch.delete(db.collection("notifications").doc(id))
            await batch.commit()
            setMessage(`You are now friends with ${sender}`)
        } catch(err){
            console.log(err)
        }         
    }

    async function handleDecline(){
        // remove from request arrays; delete notification
        try{
            const batch = db.batch()
            batch.update(db.collection("users").doc(sender_id), {friend_req_sent: firebase.firestore.FieldValue.arrayRemove(currentUser.displayName)})
            batch.delete(db.collection("notifications").doc(id))
            await batch.commit()
            setMessage(`You have declined ${sender}'s request`)
        } catch (err){
            console.log(err)
        }
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

export default FriendNotificationItem