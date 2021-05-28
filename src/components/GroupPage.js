import React, {useEffect, useState} from 'react'
import axios from "../axios"
import "../Channels.css"
import Channels from './Channels'
import { useApp } from "../contexts/AppContext"
import ChannelPage from "./ChannelPage"

function GroupPage({id}) {

    const [groupData, setGroupData] = useState({})
    const [loading, setLoading] = useState(true)
    const { currentChannel } = useApp()
    // when user clicks on diff groups in sidebar, get group data from api
    useEffect(()=>{
        async function getGroups(){
            try{
                await axios.get(`/group/${id}`).then(res => {
                    setGroupData(res.data)
                })
                setLoading(false)
            }catch(err){
                console.log(err)
                // setLoading(false)
            }
        }
        getGroups()
        
    }, [id])

    return (
        <div className="groupPage">
            <div className="channelSidebar">
            <h2>{groupData.group_name}</h2>
            <hr style={{border:"none" , borderTop:"1px solid black"}} />
            {!loading && groupData.channelData.map(channel => (
                <Channels key={channel.id} id={channel.id} name={channel.name}/>
            ))}
            </div>
            <div className="channelContent">
            {!loading && groupData.channels.includes(currentChannel) && 
            <ChannelPage id={currentChannel} group_id={id} />}
            </div>
        </div>
    )
}

export default GroupPage
