import React, { useEffect, useState } from 'react'
import Checkbox from '@material-ui/core/Checkbox';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import "../Channels.css"
import { IconButton, InputBase } from '@material-ui/core';
import {db} from "../firebase"
import { makeStyles } from "@material-ui/core/styles";
import AddIcon from '@material-ui/icons/Add';
import { v4 as uuidv4 } from 'uuid';
import Alert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';
import ClearIcon from '@material-ui/icons/Clear';
import firebase from "firebase/app";
import { DragIndicator } from '@material-ui/icons';
import { useAuth } from '../contexts/AuthContext';
import CompletedUsers from "./CompletedUsers"
import DeleteIcon from '@material-ui/icons/Delete';

const useStyles = makeStyles({
    input: {
      color: "white"
    }
  });
  
function Mugsheet({id, channelId, tasks, title, groupId}) {
    

    const classes = useStyles()
    const {currentUser} = useAuth()
    const [newtask, setNewTask] = useState("")
    const [newTitle, setNewTitle] = useState("")
    const [error , setError] = useState(false)
    const docRef = db.collection("groups").doc(groupId).collection("channels").doc(channelId)
                                        .collection("mugSheets").doc(id)

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') { return; }
        setError(false);
    };
    function handleOnDragEnd(result) {
        if (!result.destination) return;
        const items = Array.from(tasks);
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);
        // console.log(items)
        docRef.update({tasks: items});
      }
    //update existing task text
    function handleChange(e){
        const items = Array.from(tasks);
        items[Number(e.target.name)].text = e.target.value
        docRef.update({tasks: items}).catch(() => setError(true))
    }
    
    function handleChangeNew(e){
        if (e.target.name !== "addTitle"){
            setNewTask(e.target.value)
        }else if (e.target.name === "addTitle"){
            setNewTitle(e.target.value)
        }
    }
    // add new task object to the array when input lose focus
    function handleAdd(e){
        if (e.target.name === "addTitle"){
            docRef.update({title: newTitle}).catch(() => setError(true))
            
        }else{
            if(newtask){
                const items = Array.from(tasks)
                const id  = uuidv4()
                items.push({ complete: false, id: id, text: newtask , completed_by:[]})
                docRef.update({tasks: items}).catch(() => setError(true))
                setNewTask("")
            }  
        }
        
    }
    //handle checkbox logic
    function handleCheck(e){
        const items = Array.from(tasks)
        if (e.target.checked){
            items[Number(e.target.name)].completed_by.push(currentUser.uid)
        } else if (items[Number(e.target.name)].completed_by.includes(currentUser.uid) && !e.target.checked){
            items[Number(e.target.name)].completed_by.pop(currentUser.uid)
        }
        items[Number(e.target.name)].complete = e.target.checked
        docRef.update({tasks: items}).catch(() => setError(true))
    }
    //delete task logic
    function handleDelete(e){
        const temp = Array.from(tasks)
        const pos = temp.map(el => el.id).indexOf(e.currentTarget.name)
        docRef.update({tasks: firebase.firestore.FieldValue.arrayRemove(tasks[pos])})
        .catch((err) => setError(true))
    }
    //delete sheet logic
    function handleDeleteSheet(){
        docRef.delete()
    }
    // reset title state when new sheet mounts
    useEffect(() => {
        setNewTitle(title)
    },[title])

    return (
        <div className="mugsheet">
        <Snackbar open={Boolean(error)} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="warning">
          You may not be up to date. Please refresh your page.
        </Alert>
      </Snackbar>
      <div className="sheetHeader">
        <InputBase className="title" name="addTitle" classes={{input: classes.input}} style={{width:"100%", padding:"10px",fontSize:"26px"}} 
                    autoComplete="off" onBlur={handleAdd} onChange={handleChangeNew} value={newTitle} placeholder="Title" />
            <IconButton onClick={handleDeleteSheet}>
            <DeleteIcon className="deleteIcon" />
            </IconButton>
        </div>
            <DragDropContext onDragEnd={handleOnDragEnd}>
                <Droppable droppableId="tasks">
                    {(provided) => (
                    <ul {...provided.droppableProps} ref={provided.innerRef}>
                        {tasks.map(({id, text,completed_by}, index) => {
                        return (
                            
                            <Draggable key={id} draggableId={id} index={index} >
                            {(provided) => (
                                <li className="taskContainer" ref={provided.innerRef} {...provided.draggableProps}>
                                <div {...provided.dragHandleProps}><DragIndicator/></div>
                                <Checkbox checked={completed_by.includes(currentUser.uid)} name={id} onChange={handleCheck} style={{color:"white"}} />                       
                                <InputBase className="existingTask" classes={{input: classes.input}} defaultValue={text} name={id} onChange={handleChange} autoComplete="off"/>
                                <IconButton name={id} className="clearIcon"  onClick={handleDelete}>
                                <ClearIcon />
                                </IconButton>
                                {completed_by.length && <CompletedUsers users={completed_by}/> }
                                </li>
                            )}
                            </Draggable>
                            
                        );
                        })}
                        
                        {provided.placeholder}
                        <div className="addTask-container">
                        <AddIcon />
                        <InputBase className="addTask" name="addNew" classes={{input: classes.input}} style={{width:"100%", padding:"10px"}} 
                        onBlur={handleAdd} onChange={handleChangeNew} value={newtask} placeholder="Add something to mug" autoComplete="off" />
                        </div>
                    </ul>
                    )}
                </Droppable>
            </DragDropContext>
        </div>
    )
}

export default Mugsheet
