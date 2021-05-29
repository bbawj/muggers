import React, {useState, useEffect } from "react";
import Group from "./Group"
import { useAuth } from "../contexts/AuthContext"
import "../Sidebar.css"
import AddIcon from '@material-ui/icons/Add';
import GroupIcon from '@material-ui/icons/Group';
import { db } from "../firebase";
import firebase from "firebase/app";
import Alert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';

function StudyGroupsOption(){
    const [studyGroups,setStudyGroups] = useState([]);
    const [error, setError] = useState("")
    const { currentUser } = useAuth()

    function handleAdd(){
        const newGroup = prompt("Create a new study group")

        if(newGroup){
            const newGroupRef = db.collection("groups").doc()
            newGroupRef.set({
                name: newGroup,
                owner_id: currentUser.uid
            }).then(newGroupRef.update({
                members: firebase.firestore.FieldValue.arrayUnion(currentUser.uid)
            })).then( db.collection("users").doc(currentUser.uid).collection("groups").doc(newGroupRef.id).set({
                group_name: newGroup
            }) ).catch(err => setError("Error creating group"))
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
            <Snackbar open={Boolean(error)} autoHideDuration={6000} onClose={() => setError("")}>
                <Alert onClose={() => setError("")} severity="error">
                {error}
                </Alert>
            </Snackbar>
            <div className="sidebar__groups__header">
                <GroupIcon style={{padding:"20px"}} />
                <h3 style={{fontSize:"20px", fontWeight:500}}>Study Groups</h3>
                <AddIcon onClick={handleAdd} className="sidebar__groups__add"/>
            </div>
            <hr style={{border:"none" , borderTop:"1px solid black"}}/>
            <div className="groupsContainer">
            {studyGroups.map(group =>{
                
                 return (<Group key={group.studyGroupId} id={group.studyGroupId} name={group.studyGroupData.group_name}/>)})}
            </div>
         </div>
    )
}

export default StudyGroupsOption;