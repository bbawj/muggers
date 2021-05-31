import React from "react";
import Sidebar from "./Sidebar/Sidebar";
import "../Dashboard.css"
import PostBox from "./Feed/PostBox";
import FriendsList from "./Friendlist/FriendsList";
import Feed from "./Feed/Feed";
import { useApp } from "../contexts/AppContext"
import GroupPage from "./Groups/GroupPage";
import MemberList from "./Friendlist/MemberList";

function Dashboard(){

    const { currentGroup } = useApp()
 
    return(
        <div className="dashboard--main">
        <Sidebar />
        <div className="dashboard">
            {currentGroup ? <GroupPage name={currentGroup.name} id={currentGroup.id}/> : <div className="homeFeed"><PostBox /><Feed /></div>}
        </div>
        { currentGroup ? <MemberList id={currentGroup.id} /> : <FriendsList/>}
        </div>
    )
}

export default Dashboard;