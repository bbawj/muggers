import React, { useEffect, useState } from "react";
import { db } from '../../firebase';
import firebase from "firebase/app";
import "./Sidebar.css"
import { Avatar } from "@material-ui/core"
import { useApp } from "../../contexts/AppContext"
import { IconButton, Popover } from '@material-ui/core';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import { useAuth } from "../../contexts/AuthContext";

function Group({name, id, members, owner}){

    const { currentGroup, setCurrentGroup, setCurrentChannel, setGroupMembers } = useApp()
    const { currentUser } = useAuth()
    const [anchorEl, setAnchorEl] = useState(null)
    const [isOwner, setIsOwner] = useState(false)
    const open = Boolean(anchorEl)

    async function handleDeleteChannel(){
        try{
            await db.collection("groups").doc(id).delete()
            await db.collection("users").doc(currentUser.uid).update({group_ids: firebase.firestore.FieldValue.arrayRemove(id)})
            setCurrentGroup("")
        }catch(err){
            console.log(err)
        }  
    }

    useEffect(() => {
        if (owner===currentUser.uid){
            setIsOwner(true)
        }
    }, [])

    return(
        <div className={`sidebar__groups ${(currentGroup.id ===id) && 'activeGroup' }`} >
        <div className="sidebar__groups-main" onClick={ () => {
            setCurrentGroup({id: id, name:name})
            setCurrentChannel("")
            setGroupMembers(members)
            }
        }>
            {/* <Avatar style={{marginLeft:"10px"}} /> */}
            <h2 style={{fontSize:"20px",marginLeft:"20px",fontWeight:"550"}}>{name}</h2>
            </div>
            <div className={`${!isOwner && 'groupMoreOptions-hide'}`}>
            <IconButton onClick={(event) => setAnchorEl(event.currentTarget)}>
                <MoreHorizIcon />
            </IconButton>
            <Popover className="deleteChannelContainer" open={open} anchorEl={anchorEl} onClose={() => setAnchorEl(null)} anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'center',
                }}
                transformOrigin={{
                vertical: 'top',
                horizontal: 'center',
                }}>
                <span className='deleteChannel' onClick={handleDeleteChannel}>Delete Channel</span>  
            </Popover>
            </div>
        </div>
    )
}

export default Group;