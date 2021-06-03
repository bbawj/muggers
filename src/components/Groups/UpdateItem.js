import { Avatar } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { db } from '../../firebase'
import moment from 'moment';
import "./Updates.css"

function UpdateItem({type, userId, groupId, channelId, sheetTitle, taskTitle, time}) {

    const [text, setText] = useState("")
    const [url, setUrl] = useState("")
    const [username, setUserName] = useState("")
    const [channelName, setChannelName] = useState("")
    const [relTime, setRelTime] = useState("")

    async function getSingleUserInfo(){
        const info = await db.collection("users").doc(userId).get()
        await setUrl(info.data().photoURL)
        await setUserName(info.data().username)
        return
    }

    async function getChannelInfo(){
        const info = await db.collection("groups").doc(groupId).collection('channels').doc(channelId).get()
        
        if (info.data() === undefined){
            await setChannelName("deleted")
        }else{
            await setChannelName(info.data().name)
        }
        return
    }

    useEffect(() => {
        if (time){
            const date = time.toDate()
            setRelTime(moment(date).local().startOf('second').fromNow())
        } else{
            setRelTime("now")
        }
        
        async function getData(){
            try{
                switch (type) {
                    case "new task":
                        await getSingleUserInfo()
                        await getChannelInfo()
                        setText(`created a new task in ${channelName}: ${sheetTitle}`)
                        break;

                    case "new complete":
                        await getSingleUserInfo()
                        await getChannelInfo()
                        setText(`completed ${taskTitle} in ${sheetTitle}`)
                        break;
                        
                    default:
                        break;
                }
            }catch(err){
                console.log(err)
            }
            console.log("count")
        }
        getData()
    }, [channelName])

    return (
        <div className="updateItem">
            <Avatar src={url}/>
            <div className="updateItem-body">
            <div className="updateItem-header">
                <span>{username} <span className="updateItem-time">{relTime}</span></span>
            </div>
            {text && <span className="updateItemText">{text}</span>}
            </div>
        </div>
    )
}

export default UpdateItem
