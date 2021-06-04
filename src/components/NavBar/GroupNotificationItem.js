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


function GroupNotificationItem({id, sender, sender_id, group_info}){

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
            batch.update(db.collection("groups").doc(group_info.id), {members: firebase.firestore.FieldValue.arrayUnion(currentUser.uid)})
            batch.update(db.collection('users').doc(currentUser.uid), {group_ids: firebase.firestore.FieldValue.arrayUnion(group_info.id)})
            batch.delete(db.collection("notifications").doc(id))
            await batch.commit()
            setMessage(`You have joined ${group_info.name}`)
        } catch(err){
            console.log(err)
        }         
    }

    async function handleDecline(){
        // remove from request arrays; delete notification
        try{
            const batch = db.batch()
            batch.delete(db.collection("notifications").doc(id))
            await batch.commit()
            setMessage(`You have declined an invitation to ${group_info.name}`)
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
            <span>{sender} has invited you to {group_info.name}</span>
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

export default GroupNotificationItem