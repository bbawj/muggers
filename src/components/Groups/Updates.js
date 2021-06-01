import React, { useEffect, useState } from 'react'
import { db } from '../../firebase'
import UpdateItem from './UpdateItem'
import "./Updates.css"

function Updates({id}) {

    const [updates, setUpdates] = useState([])

    useEffect(() => {
        async function getUpdates(){
            try{
                const unsubscribe = db.collection("groups").doc(id).collection("updates").onSnapshot(snapshot => {
                    setUpdates(snapshot.docs.map(doc => doc.data()))
                })
                return unsubscribe
            }catch(err){
                console.log(err)
            }
        }
        getUpdates()
    }, [])

    return (
        <div className="updateContainer">
            {updates.map(item => <UpdateItem type={item.type} userId={item.user_id} groupId={item.group_id} channelId={item.channel_id} sheetTitle={item.sheet_title} />)}
        </div>
    )
}

export default Updates
