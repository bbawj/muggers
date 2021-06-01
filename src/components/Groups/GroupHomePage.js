import React from 'react'
import { useApp } from "../../contexts/AppContext"
import InviteModal from './InviteModal'
import "./Channels.css"
import Updates from './Updates'

function GroupHomePage({name, id}) {
    return (
        <div className="groupHomePage">
            <div className="groupHomePage-header">
            <h2 style={{marginBottom:"10px"}}>Welcome to {name}</h2>
            <InviteModal  group_name={name} group_id={id} />
            <hr style={{width:"100%",  borderTop:"1px solid black", borderBottom:"none", marginTop:"10px" }} />
            <Updates id={id} />
            </div>
        </div>
    )
}

export default GroupHomePage
