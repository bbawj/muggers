import React, { useState, useEffect } from 'react'
import firebase from "firebase/app";
import Mugsheet from './Mugsheet'
import "./Channels.css"
import Button from '@material-ui/core/Button';
import { db } from '../../firebase';


function ChannelPage({id, group_id}) {

    const [channelInfo, setChannelInfo] = useState([])

    function addSheet(){
        db.collection("groups").doc(group_id).collection("channels").doc(id).collection("mugSheets").add({
           tasks:[],
           created_at: firebase.firestore.FieldValue.serverTimestamp(),
           title:"",
           pinned: false 
        })
    }
    useEffect(() => {
        const unsubscribe = db.collection("groups").doc(group_id).collection("channels").doc(id).collection("mugSheets").orderBy("created_at", "desc").onSnapshot(snapshot =>{
            setChannelInfo(snapshot.docs.map(doc=> {
                return {id:doc.id, ...doc.data()}
            }))
        })
        return unsubscribe
    }, [id])

    return (
        <div className="channelPage">
        <div className="newSheet">
            <Button variant="contained" color="primary" onClick={addSheet} >Start mugging</Button>
        </div>
            {channelInfo && channelInfo.filter(obj => obj.pinned===true).map(sheet => {
                return <Mugsheet pinned id={sheet.id} key={sheet.id} tasks={sheet.tasks} title={sheet.title} channelId={id} groupId={group_id}/> 
                }
            )}
            {channelInfo && channelInfo.filter(obj => obj.pinned===false).map(sheet => {
                return <Mugsheet id={sheet.id} key={sheet.id} tasks={sheet.tasks} title={sheet.title} channelId={id} groupId={group_id}/> 
                }
            )}
        </div>
    )
}

export default ChannelPage
