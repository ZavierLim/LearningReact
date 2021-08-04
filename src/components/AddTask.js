import {useState} from 'react'

//pass onAdd from app.js to here
const AddTask = ({onAdd}) => {
    //use this to set the state in the HTML page
    const [text,setText]=useState('')
    const [day,setDay]=useState('')
    const [reminder,setReminder]=useState('false')    

    const onSubmit=(e)=>{
        e.preventDefault() //so that dont submit to a page
        if(!text){
            alert('text is empty, please add a task')
            return
        }
        //call onAdd, pass in the object with the text, day , reminder
        onAdd({text,day,reminder})

        //after submit, i will clear the values in the form
        setText('')
        setDay('')
        setReminder(false)
    }
    return (
        <form className='add-form' onSubmit={onSubmit}>
            <div className='form-control'>
                <label>Task</label>
                <input type='text' value={text} onChange={(e)=>setText(e.target.value)} 
                placeholder='Add Task'/>
            </div>

            <div className='form-control'>
                <label>Day & Time</label>
                <input type='text' value={day} onChange={(e)=>setDay(e.target.value)}
                placeholder='Add Day & Time'/>
            </div>

            <div className='form-control form-control-check'>
                <label>Set Reminder</label>
                <input 
                    type='checkbox'
                    checked={reminder} //set it to true by default
                    value ={reminder} 
                    onChange={(e)=>setReminder(e.currentTarget.checked)}/>
            </div>

            <input className='btn btn-block' type='submit' value='Save Task'/>
        </form>
    )
}

export default AddTask
