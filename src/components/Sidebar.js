import React from "react";
import "../Sidebar.css";
import StudyGroupsOption from "./StudyGroupsOption";
import FriendsList from "./FriendsList"
import FeedOption from "./FeedOption"

function Sidebar(){
    return(
        <div className="sidebar-container">
        <FeedOption active/>
        <StudyGroupsOption />
        </div>
    )
}

export default Sidebar;