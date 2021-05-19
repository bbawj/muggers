import React from "react";
import "../Sidebar.css"
import { Avatar } from "@material-ui/core"


function Group({text}){
    return(
        <div className="sidebar__groups">
            <Avatar />
            <h2 style={{fontSize:"20px"}}>{text}</h2>
        </div>
    )
}

export default Group;