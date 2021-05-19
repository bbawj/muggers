import React, { useState } from 'react'
import "../PostBox.css"
import Icon from '@material-ui/core/Icon';
import Button from '@material-ui/core/Button';
import { db } from "../firebase"
import { useAuth } from "../contexts/AuthContext"

function PostBox() {
    const [postMessage, setPostMessage] = useState("");
    const { username} = useAuth()

    function sendPost(e){
        e.preventDefault()
        if (postMessage){
            db.collection("posts").add({
                username: username,
                text: postMessage,
                avatar:
                  "https://kajabi-storefronts-production.global.ssl.fastly.net/kajabi-storefronts-production/themes/284832/settings_images/rLlCifhXRJiT0RoN2FjK_Logo_roundbackground_black.png",
              });
          
              setPostMessage("");
        }
    }

    return (
        
        <div className="postbox">
            <form>
                <input value={postMessage} onChange={(e) => setPostMessage(e.target.value)} className="postbox--area" placeholder="What you mugging?" type="text"/>
                    <div className="postbox--button--container">
                        <Button onClick={sendPost} variant="contained" color="primary" className="postbox--button" endIcon={<Icon>send</Icon>} type="submit">
                            Post
                        </Button>
                    </div>
            </form>
        </div>
        
    )
}

export default PostBox
