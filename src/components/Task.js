import React from 'react'
//this is imported using npm - i react-icons
import {FaTimes} from 'react-icons/fa'

const Task = ({task,onDelete,onToggle}) => {
    return (
        //if reminder is true, set reminder. if not , empty. use template literal
        <div className={`task ${task.reminder ?'reminder':''}`} onDoubleClick={()=>onToggle(task.id)}>
            <h3>{task.text}<FaTimes style={{color:'red',cursor:'pointer'}} 
            //pass anonymous function to console.log the ID that is deleted
            onClick={()=>onDelete(task.id)}/></h3>
            <p>{task.day}</p>     
            
        </div>
    )
}

export default Task
