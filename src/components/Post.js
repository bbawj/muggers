import { Avatar } from '@material-ui/core'
import React from 'react'
import "../Post.css"

function Post( {
    username,
    text,
    avatar
} ) {
    return (
        <div className="post">
            <div className="post__avatar">
                <Avatar src={avatar}/>
            </div>
            <div className="post__body">
                <div className="post__header">
                    <div className="post__headerText">
                        <h3>{username}</h3>
                    </div>
                    <div className="post__headerDescription">
                        {text}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Post
