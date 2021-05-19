import React from "react";
import "../Sidebar.css"
import { Avatar } from "@material-ui/core"
import { useApp } from "../contexts/AppContext"

function Group({name, id}){

    const { setGroupInfo } = useApp()
    
    
    return(
        <div className="sidebar__groups" onClick={ () => setGroupInfo({groupid: id, groupname: name})}>
            <Avatar />
            <h2 style={{fontSize:"20px"}}>{name}</h2>
        </div>
    )
}

export default Group;