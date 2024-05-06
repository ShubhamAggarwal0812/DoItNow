import { useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import { v4 as uuidv4 } from 'uuid';

function App() {
  const [task, setTask] = useState("")
  const [tasks, setTasks] = useState([])
  const [showCompleted, setshowCompleted] = useState(false)

  useEffect(() => {
    const taskString = localStorage.getItem("tasks");
    if (taskString) {
      const tasksFromStorage = JSON.parse(taskString);
      // if (Array.isArray(tasksFromStorage)) {
      setTasks(tasksFromStorage);
      // }
    }
  }, [])

  const saveToLS = () => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }

  const toggleCompleted = (e) => {
    setshowCompleted(!showCompleted)
  }


  const handleChange = (e) => {
    setTask(e.target.value);
  }

  const handleSave = () => {
    setTasks([...tasks, { id: uuidv4(), task, isCompleted: false }])
    setTask("")
    saveToLS()
  }

  const handleUpdate = () => {

  }

  const handleCheckbox = (e) => {
    let id = e.target.name
    let index = tasks.findIndex(item => {
      return item.id === id;
    })
    let newTasks = [...tasks];
    newTasks[index].isCompleted = !newTasks[index].isCompleted;
    setTasks(newTasks)
    saveToLS()
  }

  const handleEdit = (e, id) => {
    let t = tasks.filter(i => i.id === id)
    setTask(t[0].task)
    let newTasks = tasks.filter(item => {
      return item.id !== id
    })
    setTasks(newTasks)
    saveToLS()
  }

  const handleDelete = (e, id) => {
    let newTasks = tasks.filter(item => {
      return item.id !== id
    })
    setTasks(newTasks)
    saveToLS()
  }

  return (
    <>
      <div className="bg-sky-200 min-h-screen">
        <div className="main mx-auto bg-sky-300 w-full sm:w-1/2">
          <Navbar />
          <div className="new-task my-5 px-3">
            <h1 className='text-lg font-bold text-cyan-950'>New Task</h1>
            <input onChange={handleChange} value={task} className='w-full outline-none rounded-sm border border-cyan-950 p-2' type="text" placeholder='Enter Your Task (min 3 characters)' />
            <div className='flex justify-end gap-3 my-3'>
              <button onClick={handleSave} disabled={task.trim().length < 3 || /^\s*$/.test(task)} className='bg-cyan-600 px-2 py-1 border rounded text-white hover:bg-cyan-700 disabled:bg-cyan-600'>Save</button>
              <button onClick={handleUpdate} className='bg-cyan-600 px-2 py-1 border rounded text-white hover:bg-cyan-700'>Update</button>
            </div>
          </div>
          <hr></hr>
          <div className='overflow-y-auto mx-3 min-h-80'>
            <h1 className='text-center text-xl font-semibold my-3'>Your Tasks</h1>
            <input onChange={toggleCompleted} type="checkbox" checked={showCompleted} /> Show Completed Task(s)
            {!showCompleted && tasks.filter(item => !item.isCompleted).length === 0 && <div className='text-center text-lg my-10'>No Task(s) Available</div>}
            {tasks.map(item => {
              return (showCompleted || !item.isCompleted) && <div key={item.id} className="card w-full flex justify-between items-center border border-cyan-950 rounded px-3 py-2 my-2">
                <div className='w-11/12 flex gap-3'>
                  <input name={item.id} onChange={handleCheckbox} type="checkbox" checked={item.isCompleted} />
                  <p className={item.isCompleted ? "line-through text-lg break-all" : "text-lg break-all"}>{item.task}</p>
                </div>
                <div className='flex gap-2'>
                  <img onClick={(e) => { handleEdit(e, item.id) }} className='w-8 h-8 cursor-pointer p-1 border border-transparent hover:border-cyan-950 hover:rounded-md' src='src\assets\edit.png' />
                  <img onClick={(e) => { handleDelete(e, item.id) }} className='w-8 h-8 cursor-pointer p-1 border border-transparent hover:border-cyan-950 hover:rounded-md' src='src\assets\delete.png' />
                </div>
              </div>
            })}

          </div>
          <Footer />
        </div>
      </div>
    </>
  )
}

export default App
