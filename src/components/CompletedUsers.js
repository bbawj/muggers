import React, { useEffect, useState } from 'react'
import Avatar from '@material-ui/core/Avatar';
import AvatarGroup from '@material-ui/lab/AvatarGroup';
import { db } from '../firebase';
import { Tooltip } from '@material-ui/core';

function CompletedUsers({users}) {

    const [info, setInfo] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function getCompletedUsers(){
            try{
                const reads = users.map(user => db.collection("users").doc(user).get())
                const promises = await Promise.all(reads)
                setInfo(promises.map(doc => doc.data()))
                setLoading(false)
            }catch{err => {
                console.log(err)
            }}
            
        }
        getCompletedUsers()
    }, [])

    return (
        <AvatarGroup>
            {!loading && info.map(user=>{ return (
                <Tooltip title={user.username}>
                <Avatar key={user.username} id={user.username} src={user.photoURL} />
                </Tooltip>
            )})}
        </AvatarGroup>
    )
}

export default CompletedUsers
