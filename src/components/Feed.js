import React, { useEffect, useState } from 'react'
import Post from './Post'
import { db } from "../firebase"

function Feed() {
    const [posts, setPosts] = useState([])

    useEffect(()=> {
        db.collection('posts').onSnapshot(snapshot => (
            setPosts(snapshot.docs.map(doc => doc.data()))
        ))
    },[])

    return (
        <div className="feed"> 
            <h2>Recent Activity</h2>
            {posts.map(post => (
                <Post username={post.username} text={post.text} avatar={post.avatar} key={post.uid} />
            ))}
        </div>
    )
}

export default Feed
