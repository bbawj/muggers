import React from 'react'
import "../Sidebar.css"
import HomeIcon from '@material-ui/icons/Home';
import { useApp } from "../contexts/AppContext"

function FeedOption({active}) {

    const { setGroupInfo } = useApp()

    return (
        <div onClick={() => setGroupInfo({groupid: "", groupname:""})} className={`feedOption ${active && 'sidebar--active'}`}>
            <HomeIcon />
            <h2>Feed</h2>
        </div>
    )
}

export default FeedOption
