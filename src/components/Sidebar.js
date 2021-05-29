import React from "react";
import "../Sidebar.css";
import StudyGroupsOption from "./StudyGroupsOption";
import FeedOption from "./FeedOption"

function Sidebar(){
    return(
        <div className="sidebar-container">
        <FeedOption />
        <StudyGroupsOption />
        </div>
    )
}

export default Sidebar;