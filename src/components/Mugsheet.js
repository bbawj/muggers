import React, { useEffect, useState } from 'react'
import Checkbox from '@material-ui/core/Checkbox';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import "../Channels.css"
import axios from "../axios"
import { InputBase } from '@material-ui/core';
import {db} from "../firebase"

function Mugsheet({tasks, id, channelId, groupId}) {
    
    const [task, updateTask] = useState(tasks)
    
    function handleOnDragEnd(result) {
        if (!result.destination) return;
    
        const items = Array.from(task);
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);
        // console.log(items)
        updateTask(items);
      }
    
    function handleChange(e){
        const items = Array.from(task);
        items[e.target.name].text = e.target.value
        updateTask(items)
    }

    useEffect(() => {
        return () =>{
            async function update(){
                return await db.collection("groups").doc(groupId).collection("channels").doc(channelId).collection("mugSheets").doc(id).update({tasks: task})
            }
            update()
            console.log(task)
        }
    }, [task])



    return (
        <div className="mugsheet">
        {/* <input ref={titleRef}  /> */}
            <DragDropContext onDragEnd={handleOnDragEnd}>
                <Droppable droppableId="tasks">
                    {(provided) => (
                    <ul className="tasks" {...provided.droppableProps} ref={provided.innerRef}>
                        {task.map(({id, text,complete}, index) => {
                        return (
                            
                            <Draggable key={id} draggableId={id} index={index}>
                            {(provided) => (
                                <li ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                                <Checkbox checked={complete}/>
                                
                                <InputBase defaultValue={text} name={index} onChange={handleChange}/>
                                </li>
                            )}
                            </Draggable>
                        );
                        })}
                        {provided.placeholder}
                    </ul>
                    )}
                </Droppable>
            </DragDropContext>
        </div>
    )
}

export default Mugsheet
