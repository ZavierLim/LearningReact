import Task from './Task'


const Tasks = ({tasks,onDelete,onToggle}) => {
    return (
        //setTasks() add new object here
        <>
        {tasks.map((task)=>(
            <Task key={task.id} id={task.id} task={task} onDelete={onDelete} onToggle={onToggle}/>
            ))}
        </>
    )
}

export default Tasks
