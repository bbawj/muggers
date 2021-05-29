import React from 'react'
import "../Sidebar.css"
import HomeIcon from '@material-ui/icons/Home';
import { useApp } from "../contexts/AppContext"

function FeedOption() {

    const { currentGroup, setCurrentGroup, setCurrentChannel } = useApp()

    return (
        <div onClick={() => {
            setCurrentGroup("")
            setCurrentChannel("")
        } } className={`feedOption ${(currentGroup ==="")&& 'sidebar--active'}`}>
            <HomeIcon />
            <h2>Feed</h2>
        </div>
    )
}

export default FeedOption
