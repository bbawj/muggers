import React, { useEffect, useState } from 'react'
import { db } from '../../firebase'
import Friend from './Friend'
import EmojiPeopleIcon from '@material-ui/icons/EmojiPeople';
import "./FriendList.css"

function MemberList({id}) {

    const [members, setMembers] = useState([])

    useEffect(() => {
        async function getMembers(){
            try{
                const group =  await db.collection("groups").doc(id).get()
                const memberArray = group.data().members 
                const promises = memberArray.map(member => 
                    db.collection("users").doc(member).get()
                                )
                const data = await Promise.all(promises)
                setMembers(data.map(doc => { return {id: doc.id,...doc.data()}}))
            }catch(err){
                console.log(err)
            }
        }
        getMembers()
    }, [id])

    return (
        <div className="friendlist">
            <div className="friendlist-header">
                <EmojiPeopleIcon />
                <h2>Member List</h2>
            </div>
            {members.map(member => {
                return <Friend key={member.id} username={member.username} photo={member.photoURL} />
            })}
        </div>
    )
}

export default MemberList
