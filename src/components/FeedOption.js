import React from 'react'
import "../Sidebar.css"
import HomeIcon from '@material-ui/icons/Home';

function FeedOption({active}) {
    return (
        <div className={`feedOption ${active && 'sidebar--active'}`}>
            <HomeIcon />
            <h2>Feed</h2>
        </div>
    )
}

export default FeedOption
