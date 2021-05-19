import React from "react";
import Sidebar from "./Sidebar";
import "../Dashboard.css"
import PostBox from "./PostBox";
import FriendsList from "./FriendsList";
import Feed from "./Feed";

function Dashboard(){
    return(
        <div className="dashboard--main">
        <Sidebar />
        <div className="dashboard">
            <PostBox />
            <Feed />
        </div>
        <FriendsList />
        </div>
    )
}

export default Dashboard;