import { Avatar } from '@material-ui/core'
import React from 'react'
import { useState, useEffect } from 'react'
import { db } from '../../firebase'
import moment from 'moment';
import "./Post.css"

function Post( {username, text, time} ) {

    const [url, setUrl] = useState("")
    const [relTime, setRelTime] = useState("")

    useEffect(() => {
        if (time){
            const date = time.toDate()
            setRelTime(moment(date).local().startOf('second').fromNow())
        }
        db.collection("users").where("username","==", username).limit(1).get().then(doc=>{
            setUrl(doc.docs.map(doc => doc.data().photoURL)[0])
        }).catch(err => {
            console.log(err)
        })
    
    }, [])
    
    return (
        <div className="post">
            <div className="post__avatar">
                <Avatar src={url}/>
            </div>
            <div className="post__body">
                <div className="post__header">
                    <div className="post__headerText">
                        <h3 style={{fontWeight:"500"}}>{username}</h3>
                        <h3 style={{fontWeight:"500", fontSize:"10px", marginLeft:"10px", color:"grey"}} >{relTime}</h3>
                    </div>
                    <div className="post__headerDescription">
                        {text}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Post
