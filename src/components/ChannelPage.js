import React, { useState, useEffect } from 'react'
import axios from "../axios"
import Mugsheet from './Mugsheet'
import "../Channels.css"
import Button from '@material-ui/core/Button';

function ChannelPage({id, group_id}) {

    const [channelInfo, setChannelInfo] = useState({})
    const [loading, setLoading] =useState(true)
    const [expanded, setExpanded] = useState(false)


    // when user clicks on diff channel on sidebar, get channel data from api
    useEffect(() => {
        async function getChannel(){
            try{
                await axios.get(`/group/${group_id}/channel/${id}`).then(res => {
                    setChannelInfo(res.data.data) //array of current channel mugsheet objects
                    setLoading(false)
                })
  
            }catch (err){
                console.log(err)
                // setLoading(false)
            }
        }
        getChannel()
    }, [id])
    
    return (
        <div className="channelPage">
        <div className="newSheet">
            <Button>Start mugging</Button>
        </div>
            {!loading && channelInfo.map(sheet => {
                return <Mugsheet id={sheet.id} channelId={id} groupId={group_id}/> 
                }
            )}
        </div>
    )
}

export default ChannelPage
