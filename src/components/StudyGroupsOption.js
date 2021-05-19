import React, {useState, useEffect } from "react";
import Group from "./Group"
import Header from "./Header";
import "../Sidebar.css"
import AddIcon from '@material-ui/icons/Add';
import GroupIcon from '@material-ui/icons/Group';
import { db } from "../firebase";

function StudyGroupsOption(){
    const [studyGroups,setStudyGroups] = useState([]);

    function handleAdd(){
        const newGroup = prompt("Create a new study group")

        if(newGroup){
            db.collection('groups').add({
                group_name: newGroup
            })
        }

    }

    useEffect(()=> {
        db.collection('groups').onSnapshot(snapshot => (
            setStudyGroups(
                snapshot.docs.map(doc => ({studyGroupId: doc.id, studyGroupData: doc.data()})),
            )
        ))
    },[])

    return(
        <div className="studyGroups">
         <div className="sidebar__groups__header">
            <GroupIcon style={{padding:"20px"}} />
            <h3 style={{fontSize:"20px"}}>Study Groups</h3>
            <AddIcon onClick={handleAdd} className="sidebar__groups__add"/>
         </div>
         <hr style={{border:"none" , borderTop:"1px solid black"}}/>
            {studyGroups.map(group => (<Group key={group.studyGroupId} id={group.studyGroupId} name={group.studyGroupData.group_name}/>))}
         </div>
    )
}

export default StudyGroupsOption;