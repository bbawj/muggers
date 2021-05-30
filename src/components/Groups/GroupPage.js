import React, {useEffect, useState} from 'react'
import "./Channels.css"
import Channels from './Channels'
import { useApp } from "../../contexts/AppContext"
import ChannelPage from "./ChannelPage"
import AddIcon from '@material-ui/icons/Add';
import Alert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';
import {db} from "../../firebase"
import { Button, Tooltip } from '@material-ui/core'
import InviteModal from './InviteModal'

function GroupPage({id, name}) {

    const [channels, setChannels] = useState([])
    const { currentChannel } = useApp()
    const [error, setError] = useState("")

    function addChannel(){
        const newChannel = prompt("Create a new channel")

        if(newChannel){
            const docRef = db.collection("groups").doc(id).collection("channels").doc()
            docRef.set({ name: newChannel, id:docRef.id }).catch(() => setError("Error creating channel"))
        }

    }

    useEffect(() => {
        const unsubscribe = db.collection("groups").doc(id).collection("channels").onSnapshot(snapshot => {
            setChannels(snapshot.docs.map(doc => doc.data()))
        })
        return unsubscribe
    }, [id])

    return (
        <div className="groupPage">
            <Snackbar anchorOrigin={{ vertical:'top', horizontal:'center'}} open={Boolean(error)} autoHideDuration={6000} onClose={() => setError("")}>
                <Alert onClose={() => setError("")} severity="error">
                {error}
                </Alert>
            </Snackbar>
            <div className="channelSidebar">
            <div className="channelSidebar-header">
            <h2>Channels</h2>
            <Tooltip placement="top" title="Add Channel">
            <AddIcon style={{cursor:'pointer'}} onClick={addChannel} />
            </Tooltip>
            </div>
            <hr style={{border:"none" , borderTop:"1px solid #2C2F33"}} />
            {channels.map(channel => (
                <Channels key={channel.id} id={channel.id} name={channel.name}/>
            ))}
            </div>
            <div className="channelContent">
            { !currentChannel && <div><h2>Welcome to {name}</h2></div> }
            <InviteModal group={name} />
           {currentChannel && <ChannelPage id={currentChannel} group_id={id} />}
            </div>
        </div>
    )
}

export default GroupPage
