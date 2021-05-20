import React from "react";
import Sidebar from "./Sidebar";
import "../Dashboard.css"
import PostBox from "./PostBox";
import FriendsList from "./FriendsList";
import Feed from "./Feed";
import { useApp } from "../contexts/AppContext"
import GroupPage from "./GroupPage";

function Dashboard(){

    const { groupinfo } = useApp()

    return(
        <div className="dashboard--main">
        <Sidebar />
        <div className="dashboard">
            {groupinfo.groupid ? <GroupPage data={groupinfo}/> : <div><PostBox /><Feed /></div>}
        </div>
        <FriendsList />
        </div>
    )
}

export default Dashboard;