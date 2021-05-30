import React, { useEffect, useState } from 'react'
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import { Avatar, Button, IconButton } from '@material-ui/core';
import ClearIcon from '@material-ui/icons/Clear';
import { useAuth } from '../../contexts/AuthContext';
import { db } from '../../firebase';
import "../Friendlist/FormDialog.css"
import { useApp } from '../../contexts/AppContext';


function InviteModal({group}) {

    const [open, setOpen ] =useState(false)
    const [friends, setFriends] = useState([])
    const { groupMembers } = useApp()
    const { currentUser } = useAuth()

    function sendInvite(){
        db.collection("users")
    }

    useEffect(() => {
        async function getFriends(){
            try{
                const doc = await db.collection("friends").doc(currentUser.displayName).get()
                const friends = doc.data().users.filter(friend => !groupMembers.includes(friend))
                const reads = friends.map(id => db.collection("users").doc(id).get()) 
                const data = await Promise.all(reads)
                setFriends(data.map(doc => doc.data()))
            }catch (err){
                console.log(err)
            }
        }
        getFriends()
    }, [])

    return (
        <div>
            <Button onClick={()=> setOpen(true)}>Invite Friends</Button>
            <Dialog open={open} onClose={() => setOpen(false)} className="dialog">
            <DialogTitle>
            <div style={{display:"flex", alignItems:"center"}}>
                Invite Friends to {group}
                <DialogActions>
                    <IconButton onClick={() => setOpen(false)}><ClearIcon /></IconButton>
                </DialogActions> 
                </div>
            </DialogTitle>
            <DialogContent style={{height:"100px"}}>
            {friends.map(friend => (
                <div className="inviteFriend" key={friend.username} >
                    <Avatar src={friend.photoURL}/>
                    <span style={{flex:"1", marginLeft:"10px"}}>{friend.username}</span>
                    <Button className="inviteButton" variant="outlined" onClick={sendInvite}>Invite</Button>
                </div>
            ))}
                
            </DialogContent>
            </Dialog>
        </div>
    )
}

export default InviteModal
