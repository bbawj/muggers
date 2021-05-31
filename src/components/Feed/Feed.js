import React, { useEffect, useState } from 'react'
import Post from './Post'
import { db } from "../../firebase"
import {useAuth} from "../../contexts/AuthContext"

function Feed() {

    const { currentUser } = useAuth()
    const [posts, setPosts] = useState([])
    const [unsortedPosts, setUnsortedPosts] = useState([])

    useEffect(()=>{

        async function getFeed(){
            const followedUsers = await db.collection('friends')
                .where('users', 'array-contains', currentUser.uid)
                .orderBy('lastPost', 'desc')
                .limit(10)
                .get()
            
            const data = followedUsers.docs.map(doc => db.collection("friends").doc(doc.id).collection("recentPosts").get())
            const test = await Promise.all(data)
            const posts = test.map(doc => doc.docs.map(doc=>doc.data()))
            const recentPosts = posts.reduce((acc,cur) => acc.concat(cur) , [])
            const unsubscribe = db.collection("posts").where("username", "==", currentUser.displayName)
                                .onSnapshot(snapshot =>{
                                const myPosts = snapshot.docs.map(doc => doc.data())
                                setUnsortedPosts([...recentPosts, ...myPosts])
                                })
            
            
            return unsubscribe
        }
        getFeed()
    }, [])

    useEffect(() => {
        async function getPosts(){
            const sortedPosts = unsortedPosts.sort((a,b) => b.created_at - a.created_at)
            const postIds = sortedPosts.map(post => post.id)
            const reads = postIds.map(id=> db.collection('posts').doc(id).get())
            const data = await Promise.all(reads)
            setPosts(data.map(read => read.data()))
        }
        getPosts()
        
    }, [unsortedPosts])

    return (
        <div className="feed"> 
            <h2 style={{fontWeight:500}}>Recent Activity</h2>
            {posts.map(post => (
                <Post time={post.created_at} userId={post.userId} username={post.username} text={post.text} key={post.id} />
            ))}
        </div>
    )
}

export default Feed
