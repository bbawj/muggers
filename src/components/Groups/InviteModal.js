import React, { useEffect, useState } from 'react'
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import { Avatar, Button, IconButton } from '@material-ui/core';
import ClearIcon from '@material-ui/icons/Clear';
import { useAuth } from '../../contexts/AuthContext';
import { db } from '../../firebase';
import firebase from "firebase/app";
import "../Friendlist/FormDialog.css"
import { useApp } from '../../contexts/AppContext';


function InviteModal({group_name, group_id}) {

    const [open, setOpen ] =useState(false)
    const [sent, setSent] = useState(false)
    const [friends, setFriends] = useState([])
    const { groupMembers } = useApp()
    const { currentUser } = useAuth()

    function sendInvite(e){
        const friend_id = e.currentTarget.id

        db.collection('notifications').add({
            created_at: firebase.firestore.FieldValue.serverTimestamp(),
            read: false,
            receiver: friend_id,
            sender: {id: currentUser.uid, username: currentUser.displayName},
            type: "group",
            group_info: {id :group_id, name:group_name}
        })
        setSent(true)
    }

    useEffect(() => {
        async function getFriends(){
            try{
                const doc = await db.collection("friends").doc(currentUser.displayName).get()
                const friends = doc.data().users.filter(friend => !groupMembers.includes(friend))
                const reads = friends.map(id => db.collection("users").doc(id).get()) 
                const data = await Promise.all(reads)
                setFriends(data.map(doc => {return  {id: doc.id, ...doc.data()}}))
            }catch (err){
                console.log(err)
            }
        }
        getFriends()
    }, [])

    return (
        <div>
            <Button variant="contained" color="primary" onClick={()=> setOpen(true)}>Invite Friends</Button>
            <Dialog open={open} onClose={() => setOpen(false)} className="dialog">
            <DialogTitle>
            <div style={{display:"flex", alignItems:"center"}}>
                Invite Friends to {group_name}
                <DialogActions>
                    <IconButton style={{color:"grey"}} onClick={() => setOpen(false)}><ClearIcon /></IconButton>
                </DialogActions> 
                </div>
            </DialogTitle>
            <DialogContent style={{height:"100px"}}>
            {friends && friends.map(friend => (
                <div className="inviteFriend" key={friend.username} >
                    <Avatar src={friend.photoURL}/>
                    <span style={{flex:"1", marginLeft:"10px"}}>{friend.username}</span>
                    {sent ? <Button style={{color:"grey"}} disabled>Sent</Button>:
                    
                    <Button className="inviteButton" id={friend.id} variant="outlined" onClick={sendInvite}>Invite</Button>}
                </div>
            ))}
            {!friends && <span>There is no one to invite right now</span> } 
            </DialogContent>
            </Dialog>
        </div>
    )
}

export default InviteModal
