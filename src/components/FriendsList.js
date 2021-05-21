import React from 'react'
import "../FriendList.css"
import FormDialog from "./FormDialog"


function FriendsList() {
    return (
        <div className="friendlist">
            <div className="friendlist-header">
                <h2>Mugger List</h2>
                <FormDialog type="add" icon="Add Friend" title="ADD FRIEND" text="You can add a friend with their username. Case sensitive!" />
            </div>
        </div>
    )
}

export default FriendsList
