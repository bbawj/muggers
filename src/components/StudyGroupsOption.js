import React, {useState} from "react";
import Group from "./Group"
import Header from "./Header";
import "../Sidebar.css"
import AddIcon from '@material-ui/icons/Add';
import GroupIcon from '@material-ui/icons/Group';

function StudyGroupsOption(){
    const [studyGroups,setStudyGroups] = useState([]);

    return(
        <div className="studyGroups">
         <div className="sidebar__groups__header">
            <GroupIcon style={{padding:"20px"}} />
            <h3 style={{fontSize:"20px"}}>Study Groups</h3>
            <AddIcon className="sidebar__groups__add"/>
         </div>
         <hr style={{border:"none" , borderTop:"1px solid black"}}/>
            <Group text="OCM Muggers"/>
            
         </div>
        //{studyGroups.map(group => (<Group key={group.key} id={group.id} name={group.name}/>))}
    )
}

export default StudyGroupsOption;