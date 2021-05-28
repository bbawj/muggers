import React, { useRef, useState } from 'react'
import "../FormDialog.css"
import { db } from "../firebase"
import firebase from "firebase/app";
import { useAuth } from "../contexts/AuthContext"
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

function FormDialog(props) {
    const [open, setOpen] = useState(false);
    const [message, setMessage ] = useState("")
    const inputRef = useRef()
    const { currentUser } = useAuth()

    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
      setMessage("")
    };

    function handleSubmit() {
        if(props.type==="add"){
            
            const docRef = db.collection("usernames").doc(inputRef.current.value)
            docRef.get().then( async doc => {
                try{
                    if (doc.exists){
                        //check for condition in array to not duplicate notification
                        const condition = await db.collection("users").doc(currentUser.uid).get()
                        if (!condition.data().friend_req_sent || !condition.data().friend_req_sent.includes(inputRef.current.value)){
                            await db.collection("notifications").add({
                                type:"friend",
                                read: false,
                                sender: { id: currentUser.uid, username: currentUser.displayName },
                                receiver: inputRef.current.value,
                                created_at: firebase.firestore.FieldValue.serverTimestamp()
                            })
                            await db.collection("users").doc(currentUser.uid).set({friend_req_sent: [inputRef.current.value]}, {merge:true}
                                ).then(db.collection("users").doc(doc.data().id).set({friend_req_rec: [currentUser.displayName]}, {merge:true}))
                            setMessage("Friend request sent!")
                        }else{
                            setMessage("You have already sent a request")
                        }           
                    } else {
                        setMessage("User doesn't exist")
                    }
                } catch (err){
                    console.log(err)
                    setMessage("Failed to send request")
                }
            })
        } else if (props.type==="create_channel"){
           
        }
    }
    
    let clickable;
    if (props.Icon){
        clickable = <props.Icon />
    } else{
        clickable = <Button variant="contained" color="primary" onClick={handleClickOpen}>
                            {props.icon}
                        </Button>
    }

    return (
        <div>
            { clickable }
            <Dialog width="lg" open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">{props.title}</DialogTitle>
                <DialogContent>
                <DialogContentText>
                    {props.text}
                </DialogContentText>
                <span>{message}</span>
                <TextField
                    inputRef= {inputRef}
                    autoFocus
                    autoComplete="off"
                    margin="dense"
                    id="name"
                    placeholder="Username"
                    fullWidth
                />
                </DialogContent>
                <DialogActions>
                <Button onClick={handleClose} color="primary">
                    Cancel
                </Button>
                <Button onClick={handleSubmit} color="primary">
                    Send
                </Button>
                </DialogActions>
            </Dialog>
    </div>
    )
}

export default FormDialog;
