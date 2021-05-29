import React from "react";
import "../Sidebar.css"
import { Avatar } from "@material-ui/core"
import { useApp } from "../contexts/AppContext"

function Group({name, id}){

    const { currentGroup, setCurrentGroup, setCurrentChannel } = useApp()
     
    return(
        <div className={`sidebar__groups ${(currentGroup.id ===id) && 'activeGroup' }`} onClick={ () => {
            setCurrentGroup({id: id, name:name})
            setCurrentChannel("")
            }
        }>
            <Avatar />
            <h2 style={{fontSize:"20px"}}>{name}</h2>
        </div>
    )
}

export default Group;