import React, { useState } from 'react'
import { useApp } from "../../contexts/AppContext"
import "./Channels.css"
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import { IconButton, Popover } from '@material-ui/core';
import { db } from '../../firebase';

function Channels({name, id}) {

    const { setCurrentChannel, currentChannel, currentGroup } = useApp()
    const [anchorEl, setAnchorEl] = useState(null)
    const open = Boolean(anchorEl)

    async function handleDeleteChannel(){
        try{
            await db.collection("groups").doc(currentGroup.id).collection("channels").doc(id).delete()
            setCurrentChannel("")
        }catch(err){
            console.log(err)
        }  
    }

    // handle current channel user is at 
    return (
        <div className={`channels ${(currentChannel ===id ) &&'channelActive' }`} >
            <h2 style={{fontWeight:"500", fontSize:"20px"}} onClick={() => setCurrentChannel(id)}>#{name}</h2>
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
    )
}

export default Channels
