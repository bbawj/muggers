import React, { useState, useEffect } from 'react'
import { db } from '../../firebase'
import {useAuth} from "../../contexts/AuthContext"
import FriendNotificationItem from "./FriendNotificationItem"
import "./Navbar.css"

function Notifications() {

    const { currentUser } = useAuth()
    const [notifications, setNotifications] = useState([])

    
    
    useEffect(() => {
        
        async function fetchNotifs(){
            try{
                const ref = db.collection("notifications")
                const query = await ref.where("receiver", "==", currentUser.displayName).orderBy("created_at", "desc").limit(5).get()

                setNotifications(query.docs.map( (doc) => {
                    return {
                        id: doc.id,
                        type: doc.data().type,
                        sender: doc.data().sender.username,
                        sender_id: doc.data().sender.id
                    }
                }))
                
            } catch (err){
                console.log(err)
            }
        }
        fetchNotifs()
    }, [])

    return (
        <div>
            {notifications.length===0 && <span>No new notifications</span> }
            {notifications.map(notif => {
                    if (notif.type==="friend"){
                        return <FriendNotificationItem key={notif.id} id={notif.id} sender={notif.sender} sender_id={notif.sender_id} />
                    } else{
                        return null
                    }
                })}
        </div>
    )
}

export default Notifications
