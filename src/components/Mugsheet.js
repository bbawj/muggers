import React, { useEffect, useState } from 'react'
import Checkbox from '@material-ui/core/Checkbox';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import "../Channels.css"
import { InputBase } from '@material-ui/core';
import {db} from "../firebase"
import { makeStyles } from "@material-ui/core/styles";
import AddIcon from '@material-ui/icons/Add';
import { v4 as uuidv4 } from 'uuid';

const useStyles = makeStyles({
    input: {
      color: "white"
    }
  });
  

function Mugsheet({id, channelId, groupId}) {
    const classes = useStyles()
    const [task, updateTask] = useState([])
    const [newtask, setNewTask] = useState("")
    const docRef = db.collection("groups").doc(groupId).collection("channels").doc(channelId)
                                        .collection("mugSheets").doc(id)
    
    function handleOnDragEnd(result) {
        if (!result.destination) return;
    
        const items = Array.from(task);
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);
        // console.log(items)
        docRef.update({tasks: items});
      }
    //update existing task text
    function handleChange(e){
        const items = Array.from(task);
        items[e.target.name].text = e.target.value
        docRef.update({tasks: items})
    }
    
    function handleChangeNew(e){
        if (e.target.value){
            setNewTask(e.target.value)
        }
    }
    // add new task object to the array when input lose focus
    function handleAdd(){
        const items = Array.from(task)
        const id  = uuidv4()
        if(newtask){
            items.push({ complete: false, id: id, text: newtask , completed_by:[]})
            docRef.update({tasks: items})
            setNewTask("")
        }  
    }

    function handleCheck(e){
        const items = Array.from(task)
        items[e.target.name].complete = e.target.checked
        docRef.update({tasks: items})
    }

    // useEffect(() => {
    //     return () =>{
    //         async function update(){
    //             try{
    //                 const docRef = db.collection("groups").doc(groupId).collection("channels").doc(channelId)
    //                                     .collection("mugSheets").doc(id)
    //                 await db.runTransaction( (transaction) => {transaction.update(docRef, {tasks: task})})
    //             }catch (err){
    //                 console.log(err)
    //             }
    //         }
    //         update()
    //     }
    // }, [task])

    useEffect(() => {
        const unsubscribe = docRef.onSnapshot(doc => {
                                updateTask(doc.data().tasks)
                            })
        return unsubscribe
    }, [])



    return (
        <div className="mugsheet">
            <DragDropContext onDragEnd={handleOnDragEnd}>
                <Droppable droppableId="tasks">
                    {(provided) => (
                    <ul {...provided.droppableProps} ref={provided.innerRef}>
                        {task.map(({id, text,complete}, index) => {
                        return (
                            <div>
                            <Draggable key={id} draggableId={id} index={index}>
                            {(provided) => (
                                <li ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                                <Checkbox checked={complete} name={index} onChange={handleCheck} style={{color:"white"}} />
                                
                                <InputBase classes={{input: classes.input}} defaultValue={text} name={index} onChange={handleChange} autoComplete="off"/>
                                </li>
                            )}
                            </Draggable>
                            
                            </div>
                        );
                        })}
                        <div className="addTask-container">
                        <AddIcon />
                        <InputBase className="addTask" classes={{input: classes.input}} style={{width:"100%", padding:"10px"}} 
                        onBlur={handleAdd} onChange={handleChangeNew} value={newtask} placeholder="Add something to mug" />
                        </div>
                        {provided.placeholder}
                    </ul>
                    )}
                </Droppable>
            </DragDropContext>
        </div>
    )
}

export default Mugsheet
