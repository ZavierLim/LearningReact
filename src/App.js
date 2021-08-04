import {useState,useEffect} from 'react'
import {BrowserRouter as Router,Route} from 'react-router-dom'

import Header from './components/Header'
import React from 'react'
import Tasks from './components/Tasks'
import AddTask from './components/AddTask'
import Footer from './components/footer'
import About from './components/About'

function App() {
  const [showAddTask,setShowAddTask]=useState(false) //set to false by default

  const [tasks,setTasks]=useState([])

  //async to get data from the web server
  useEffect(()=>{
      const getTasks= async ()=>{
        const tasksFromServer=await fetchTasks()
        setTasks(tasksFromServer)
      }
    getTasks()
  },[]) //pass in empty array fist

  //Fetch tasks
  const fetchTasks=async()=>{
    const res=await fetch('http://localhost:5000/tasks')
    const data=await res.json()

    return data
  }

   //Fetch  1 task
   const fetchTask=async(id)=>{
    const res=await fetch(`http://localhost:5000/tasks/${id}`)
    const data=await res.json()

    return data
  }

//Add Task
const addTask=async (task)=>{
  // console.log(task);
  // const id=Math.floor(Math.random()*10000)+1
  // //... means use the rest of the object
  // const newTask={id,...task}
  // setTasks([...tasks,newTask])
  const res= await fetch('http://localhost:5000/tasks',{
    method:'POST',
    headers:{
      'Content-type':'application/json'
    },
    body:JSON.stringify(task)
  })

  //the data that is return is the new task that is returned
  const data=await res.json()
  setTasks([...tasks,data])
}

//Delete Task
const deleteTask= async (id)=>{
  //how to manipulate tasks
  await fetch(`http://localhost:5000/tasks/${id}`,{
    method:`DELETE`
  })
  setTasks(tasks.filter((task)=>task.id!==id))
}

  //toggle remidner here
const toggleReminder=async (id)=>{
  const taskToToggle= await fetchTask(id)
  //whatever is the reminder, just change to opposite
  const updatedTask={...taskToToggle,reminder:!taskToToggle.reminder}

  const res=await fetch(`http://localhost:5000/tasks/${id}`,{
    method:`PUT`,
    headers:{
      'Content-Type':'application/json'
    },
    body:JSON.stringify(updatedTask)
  })
  const data=await res.json()
  //this is for the UI
  //if the tasks is equals to the id passed, for the one we dealing with, change reminder to opposite 
  //,else no change
    setTasks(tasks.map((task)=>task.id===id?{...task, reminder: data.reminder}:task))
}
  return (
    <Router>
    <div className='container'>
      <Header 
        onAdd={()=>setShowAddTask(!showAddTask)} 
        showAdd={showAddTask}/>
  
      <Route path='/' exact render={(props)=>(
        <>
        {showAddTask && <AddTask onAdd={addTask}/>}
          {
            tasks.length>0?
          <Tasks tasks={tasks} onDelete={deleteTask} onToggle={toggleReminder}/>:('No Tasks to show')
          }
        </>
      )} />
      
      <Route path='/about' component={About}/>
      <Footer/>
    </div>
    </Router>
  )

}

//class based 
// class App extends React.Component{
//   render(){
//     return <h1>hello from a class</h1>
//   }
// }

export default App;
