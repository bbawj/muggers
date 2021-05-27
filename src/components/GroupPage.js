import React, {useEffect} from 'react'
import { useApp } from '../contexts/AppContext'
import axios from "../axios"

function GroupPage({data}) {

    const { currentGroup } = useApp()

    useEffect(()=>{

        axios.get(`/group/${currentGroup}`).then(res => {
            console.log(res.data)
        })

    }, [currentGroup])

    return (
        <div className="groupPage">
            <h2>{data.groupname}</h2>
        </div>
    )
}

export default GroupPage
