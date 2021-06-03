import React, { useEffect, useState } from 'react'
import { db } from '../../firebase'
import UpdateItem from './UpdateItem'
import "./Updates.css"

function Updates({id}) {

    const [updates, setUpdates] = useState([])
    const maxUpdatesShown = 10

    useEffect(() => {
        function getUpdates(){
            try{
                const unsubscribe = db.collection("groups").doc(id).collection("updates").onSnapshot(async snapshot => {
                    const updateArray = snapshot.docs.map(doc => {return {id:doc.id, ...doc.data()}})
                    if (updateArray.length > maxUpdatesShown){
                        const sorted = updateArray.sort((a,b) => b.created_at - a.created_at)
                        const oldest = sorted.pop()
                        await db.collection("groups").doc(id).collection("updates").doc(oldest.id).delete()
                        setUpdates(sorted)
                    } else{
                        setUpdates(updateArray)
                    }
                })
                return unsubscribe
            }catch(err){
                console.log(err)
            }
        }
        getUpdates()
    }, [id])

    return (
        <div className="updateContainer">
            {(updates.length===0) && <span className="noUpdates">There are no recent updates</span>}
            {!(updates.length===0) && updates.map(item => <UpdateItem key={item.id} taskTitle={item.task_title} type={item.type} userId={item.user_id} groupId={id} channelId={item.channel_id} sheetTitle={item.sheet_title} />)}
        </div>
    )
}

export default Updates
