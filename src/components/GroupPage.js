import React, {useEffect, useState} from 'react'
import axios from "../axios"
import "../Channels.css"
import Channels from './Channels'
import { useApp } from "../contexts/AppContext"
import ChannelPage from "./ChannelPage"

function GroupPage({id}) {

    const [groupData, setGroupData] = useState({})
    const { currentChannel } = useApp()
    // when user clicks on diff groups in sidebar, get group data from api
    useEffect(()=>{
        async function getGroups(){
            try{
                await axios.get(`/group/${id}`).then(res => {
                    setGroupData(res.data)
                })
            }catch(err){
                console.log(err)
            }
        }
        getGroups()
        
    }, [id])

    return (
        <div className="groupPage">
            <div className="channelSidebar">
            <h2>{groupData.group_name}</h2>
            {groupData && Object.keys(groupData).length !== 0 && groupData.channelData.map(channel => (
                <Channels key={channel.id} id={channel.id} name={channel.name}/>
            ))}
            </div>
            <div className="channelContent">
            <h2>{groupData.group_name}</h2>
            {groupData && Object.keys(groupData).length !== 0 && groupData.channels.includes(currentChannel) && 
            <ChannelPage id={currentChannel} group_id={id} />}
            </div>
        </div>
    )
}

export default GroupPage
