import React, { useState, useEffect } from 'react'
import axios from "../axios"

function ChannelPage({id, group_id}) {

    const [channelInfo, setChannelInfo] = useState({})
    
    // when user clicks on diff channel on sidebar, get channel data from api
    useEffect(() => {
        async function getChannel(){
            try{
                await axios.get(`/group/${group_id}/channel/${id}`).then(res => {
                    setChannelInfo(res.data)
                })
            }catch (err){
                console.log(err)
            }
        }
        getChannel()
    }, [id])

    return (
        <div className="channelPage">
            
        </div>
    )
}

export default ChannelPage
