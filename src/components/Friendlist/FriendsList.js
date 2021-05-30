import React, { useEffect, useState } from 'react'
import { useAuth } from '../../contexts/AuthContext'
import { db } from '../../firebase'
import "./FriendList.css"
import FormDialog from "./FormDialog"
import Friend from './Friend'
import EmojiPeopleIcon from '@material-ui/icons/EmojiPeople';

function FriendsList() {

    const [friends, setFriends] = useState([])
    const { currentUser } = useAuth()

    useEffect(()=>{
        //get friends and set state
        async function getFriends(){
            const friendData = await db.collection("friends").doc(currentUser.displayName).get()
            const friendArray = friendData.data().users
            const promises = friendArray.map(friend => 
                                db.collection("users").doc(friend).get()
                            )
            const data = await Promise.all(promises)
            setFriends(data.map(doc => { return {id: doc.id,...doc.data()}}))
        }
        getFriends()
    },[])

    return (
        <div className="friendlist">
            <div className="friendlist-header">
                <EmojiPeopleIcon />
                <h2>Mugger List</h2>
                <FormDialog type="add" icon="Add Friend" title="ADD FRIEND" text="You can add a friend with their username. Case sensitive!" />
            </div>
            {friends.map(friend => {
                return <Friend key={friend.id} username={friend.username} photo={friend.photoURL} />
            })}
        </div>
    )
}

export default FriendsList
