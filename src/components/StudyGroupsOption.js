import React, {useState, useEffect, useRef } from "react";
import Group from "./Group"
import { useAuth } from "../contexts/AuthContext"
import "../Sidebar.css"
import AddIcon from '@material-ui/icons/Add';
import GroupIcon from '@material-ui/icons/Group';
import { db } from "../firebase";

function StudyGroupsOption(){
    const [studyGroups,setStudyGroups] = useState([]);
    const [loading, setLoading] = useState(true)
    const { currentUser } = useAuth()

    function handleAdd(){
        const newGroup = prompt("Create a new study group")

        if(newGroup){
            const newGroupRef = db.collection("groups").doc()
            newGroupRef.set({
                group_name: newGroup,
                group_id: newGroupRef.id
            }).then( db.collection("users").doc(currentUser.uid).collection("groups").doc(newGroupRef.id).set({
                group_name: newGroup
            }) )
        }

    }
    
    useEffect(()=> {
        
        const unsubscribe = db.collection('users').doc(currentUser.uid).collection("groups").onSnapshot(snapshot => {
            
            setStudyGroups(snapshot.docs.map(doc => ( {studyGroupId: doc.id, studyGroupData: doc.data()})))
        })
        
        return unsubscribe
    },[]) 
                
           
        
        

    return(
        <div className="studyGroups">
            <div className="sidebar__groups__header">
                <GroupIcon style={{padding:"20px"}} />
                <h3 style={{fontSize:"20px"}}>Study Groups</h3>
                <AddIcon onClick={handleAdd} className="sidebar__groups__add"/>
            </div>
            <hr style={{border:"none" , borderTop:"1px solid black"}}/>
            
            {studyGroups.map(group =>{
                
                 return (<Group key={group.studyGroupId} id={group.studyGroupId} name={group.studyGroupData.group_name}/>)})}
        
         </div>
    )
}

export default StudyGroupsOption;