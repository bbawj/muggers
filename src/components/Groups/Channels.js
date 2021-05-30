import React from 'react'
import { useApp } from "../../contexts/AppContext"
import "./Channels.css"

function Channels({name, id}) {

    const { setCurrentChannel, currentChannel } = useApp()
    // handle current channel user is at 
    return (
        <div className={`channels ${(currentChannel ===id ) &&'channelActive' }`} onClick={() => setCurrentChannel(id)}>
            <h2 style={{fontWeight:"500", fontSize:"20px"}}>#{name}</h2>
        </div>
    )
}

export default Channels
