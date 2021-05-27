import React from 'react'
import { useApp } from "../contexts/AppContext"

function Channels({name, id}) {

    const { setCurrentChannel } = useApp()
    // handle current channel user is at 
    return (
        <div className="channels" onClick={() => setCurrentChannel(id)}>
            <h2 style={{fontWeight:"500", fontSize:"20px"}}>#{name}</h2>
        </div>
    )
}

export default Channels
