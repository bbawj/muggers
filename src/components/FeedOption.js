import React from 'react'
import "../Sidebar.css"
import HomeIcon from '@material-ui/icons/Home';
import { useApp } from "../contexts/AppContext"

function FeedOption({active}) {

    const { setCurrentGroup } = useApp()

    return (
        <div onClick={() => setCurrentGroup("")} className={`feedOption ${active && 'sidebar--active'}`}>
            <HomeIcon />
            <h2>Feed</h2>
        </div>
    )
}

export default FeedOption
