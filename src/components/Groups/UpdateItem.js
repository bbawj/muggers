import { Avatar } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { db } from '../../firebase'
import "./Updates.css"

function UpdateItem({type, userId, groupId, channelId, sheetTitle}) {

    const [text, setText] = useState("")
    const [url, setUrl] = useState("")
    const [username, setUserName] = useState("")
    const [channelName, setChannelName] = useState("")

    async function getSingleUserInfo(){
        const info = await db.collection("users").doc(userId).get()
        setUrl(info.data().photoURL)
        setUserName(info.data().username)
    }

    async function getChannelInfo(){
        const info = await db.collection("groups").doc(groupId).collection('channels').doc(channelId).get()
        setChannelName(info.data().name)
    }

    useEffect(() => {
        async function getData(){
            try{
                switch (type) {
                    case "new task":
                        await getSingleUserInfo()
                        await getChannelInfo()
                        setText(`${username} has created a new task in ${channelName}: ${sheetTitle}`)
                        break;
                    
                    default:
                        break;
                }
            }catch(err){
                console.log(err)
            }
        }
        getData()
    })

    return (
        <div className="updateItem">
            <Avatar src={url}/>
            <span>{text}</span>
        </div>
    )
}

export default UpdateItem
