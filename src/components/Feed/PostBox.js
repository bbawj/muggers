import React, { useState } from 'react'
import { db } from "../../firebase"
import firebase from "firebase/app";
import { useAuth } from "../../contexts/AuthContext"
import "./PostBox.css"
import Icon from '@material-ui/core/Icon';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

function PostBox() {
    const [postMessage, setPostMessage] = useState("");
    const { currentUser } = useAuth()

    async function sendPost(e){
        e.preventDefault()
        if (postMessage){   
            // add to post collection
            const batch = db.batch()
            const time = firebase.firestore.FieldValue.serverTimestamp() 
            const postRef = db.collection("posts").doc()
            batch.set(postRef, {
                id: postRef.id,
                username: currentUser.displayName,
                userId: currentUser.uid,
                text: postMessage,
                created_at: time
              })

            // update current user last post time
            const friendRef = db.collection("friends").doc(currentUser.displayName)
            batch.update(friendRef,{lastPost: time} )
           // update recentPost array map object (redudancy to improve performance)
            batch.set(friendRef.collection("recentPosts").doc(postRef.id), {id: postRef.id, created_at:time, text:postMessage} )
            await batch.commit()
             // if recentPost array > 5, get the array of posts, sort, delete the oldest post
            const friends = await friendRef.collection("recentPosts").get()
            const postArray = friends.docs.map(doc => doc.data())
            if (postArray.length > 5){
                const sorted = postArray.sort((a,b) => b.created_at - a.created_at)
                const oldest = sorted.pop()
                await friendRef.collection("recentPosts").doc(oldest.id).delete()
            }
            setPostMessage("");
        }
    }
    return (
        
        <div className="postbox">
            
                <TextField multiline value={postMessage} onChange={(e) => setPostMessage(e.target.value)} 
                type="text" inputProps={{maxLength: 140, rows:3, cols:50}} placeholder="What you mugging?"/>
                    <div className="postbox--button--container">
                        <Button onClick={sendPost} variant="contained" color="primary" className="postbox--button" endIcon={<Icon>send</Icon>} type="submit">
                            Post
                        </Button>
                    </div>
            
        </div>
        
    )
}

export default PostBox
