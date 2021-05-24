import React, { useEffect, useState } from 'react'
import Post from './Post'
import { db } from "../firebase"
import {useAuth} from "../contexts/AuthContext"

function Feed() {

    const { currentUser } = useAuth()
    const [posts, setPosts] = useState([])
    const [postIds, setPostIds] = useState([])

    useEffect(() => {
        async function getFeed(){
            const followedUsers = await db.collection('friends')
                .where('users', 'array-contains', currentUser.displayName)
                .orderBy('lastPost', 'desc')
                .limit(10)
                .get()
            
            const data = followedUsers.docs.map(doc => doc.data())
            console.log(data)
            const recentPosts = data.reduce((acc,cur) => acc.concat(cur.recentPosts) , [])
            const sortedPosts = recentPosts.sort((a,b) => b.created_at - a.created_at)
            setPostIds(sortedPosts.map(post=> post.postId))
        }
        getFeed()
    },[])

    useEffect(()=>{
        const reads = postIds.map(id=> db.collection('posts').doc(id).get())
        Promise.all(reads)
        setPosts(reads.map(read => read.data()))
    }, [postIds])

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
