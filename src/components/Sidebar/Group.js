import React from "react";
import "./Sidebar.css"
import { Avatar } from "@material-ui/core"
import { useApp } from "../../contexts/AppContext"

function Group({name, id, members}){

    const { currentGroup, setCurrentGroup, setCurrentChannel, setGroupMembers } = useApp()

    return(
        <div className={`sidebar__groups ${(currentGroup.id ===id) && 'activeGroup' }`} onClick={ () => {
            setCurrentGroup({id: id, name:name})
            setCurrentChannel("")
            setGroupMembers(members)
            }
        }>
            <Avatar />
            <h2 style={{fontSize:"20px"}}>{name}</h2>
        </div>
    )
}

export default Group;