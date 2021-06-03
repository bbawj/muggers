import React, {useState, useEffect } from "react";
import Group from "./Group"
import { useAuth } from "../../contexts/AuthContext"
import "./Sidebar.css"
import AddIcon from '@material-ui/icons/Add';
import GroupIcon from '@material-ui/icons/Group';
import { db } from "../../firebase";
import firebase from "firebase/app";
import Alert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';
import { Tooltip } from "@material-ui/core";

function StudyGroupsOption(){
    const [studyGroups,setStudyGroups] = useState([]);
    const [groupIds, setGroupIds] = useState([])
    const [error, setError] = useState("")
    const { currentUser } = useAuth()

    async function handleAdd(){
        const newGroup = prompt("Create a new study group")

        if(newGroup){
            const newGroupRef = db.collection("groups").doc()
            try{
                const batch = db.batch()
                batch.set(newGroupRef, {
                    name: newGroup,
                    owner_id: currentUser.uid,
                    members: [currentUser.uid]
                })
                batch.update(db.collection('users').doc(currentUser.uid), {group_ids: firebase.firestore.FieldValue.arrayUnion(newGroupRef.id)})
                await batch.commit()
            } catch{
                setError("Error creating group")
            }}
    }
    
    useEffect(()=> {

        const unsubscribe = db.collection('users').doc(currentUser.uid).onSnapshot(doc => {
            
            setGroupIds(doc.data().group_ids)
        })
        
        return unsubscribe
    },[]) 

    useEffect(() => {
        async function getGroupInfo(){
            try{
                const reads = groupIds.map(id => db.collection('groups').doc(id).get())
                const promises = await Promise.all(reads)
                setStudyGroups(promises.map(doc => { return {id:doc.id, ...doc.data()}}))
            }catch(err){
                console.log(err)
            }            
        }
        getGroupInfo()
    }, [groupIds])

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
                <Tooltip placement="top" title="Create new group">
                <AddIcon onClick={handleAdd} className="sidebar__groups__add"/>
                </Tooltip>
            </div>
            <hr style={{border:"none" , borderTop:"1px solid #2C2F33"}}/>
            <div className="groupsContainer">
            {studyGroups.map(group =>{
                 return (<Group members={group.members} key={group.id} id={group.id} name={group.name}/>)})}
            </div>
         </div>
    )
}

export default StudyGroupsOption;