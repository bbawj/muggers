import { Avatar } from '@material-ui/core'
import React from 'react'
import "./FriendList.css"

function Friend(props) {


    return (
        <div className="friend">
            <Avatar src={props.photo} />
            <h3>{props.username}</h3>
        </div>
    )
}

export default Friend
