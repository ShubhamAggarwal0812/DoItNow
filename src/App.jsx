import { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { v4 as uuidv4 } from 'uuid';

function App() {
  // State for managing task input
  const [task, setTask] = useState("");
  // State for storing tasks
  const [tasks, setTasks] = useState([]);
  // State for toggling completed tasks visibility
  const [showCompleted, setShowCompleted] = useState(false);

  // Load tasks from local storage on component mount
  useEffect(() => {
    const taskString = localStorage.getItem("tasks");
    if (taskString) {
      const tasksFromStorage = JSON.parse(taskString);
      setTasks(tasksFromStorage);
    }
  }, []);

  // Save tasks to local storage
  const saveToLS = () => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }

  // Toggle completed tasks visibility
  const toggleCompleted = () => {
    setShowCompleted(!showCompleted);
  }

  // Handle input change for task entry
  const handleChange = (e) => {
    setTask(e.target.value);
  }

  // Handle adding a new task
  const handleSave = () => {
    if (task.trim().length < 3 || /^\s*$/.test(task)) return; // Validate task input
    setTasks([...tasks, { id: uuidv4(), task, isCompleted: false }]);
    setTask("");
    saveToLS();
  }

  // Handle toggling task completion status
  const handleCheckbox = (e) => {
    const id = e.target.name;
    const newTasks = tasks.map(item => {
      if (item.id === id) {
        return { ...item, isCompleted: !item.isCompleted };
      }
      return item;
    });
    setTasks(newTasks);
    saveToLS();
  }

  // Handle editing a task
  const handleEdit = (id) => {
    const editedTask = tasks.find(task => task.id === id);
    if (editedTask) {
      setTask(editedTask.task);
      const updatedTasks = tasks.filter(task => task.id !== id);
      setTasks(updatedTasks);
      saveToLS();
    }
  }

  // Handle deleting a task
  const handleDelete = (id) => {
    const updatedTasks = tasks.filter(task => task.id !== id);
    setTasks(updatedTasks);
    saveToLS();
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
            </div>
          </div>
          <hr />
          <div className='overflow-y-auto mx-3 min-h-80'>
            <h1 className='text-center text-xl font-semibold my-3'>Your Tasks</h1>
            <input onChange={toggleCompleted} type="checkbox" checked={showCompleted} /> Show Completed Task(s)
            {tasks.length === 0 && <div className='text-center text-lg my-10'>No Task Available</div>}
            {/* Display tasks based on completion status and visibility */}
            {!showCompleted && tasks.filter(item => !item.isCompleted).length === 0 && tasks.length > 0 && <div className='text-center text-lg my-10'>No Pending Task Available</div>}
            {!showCompleted && tasks.filter(item => !item.isCompleted).map(item => (
              <div key={item.id} className="card w-full flex justify-between items-center border border-cyan-950 rounded px-3 py-2 my-2">
                <div className='w-11/12 flex gap-3'>
                  <input name={item.id} onChange={handleCheckbox} type="checkbox" checked={item.isCompleted} />
                  <p className={item.isCompleted ? "line-through text-lg break-all" : "text-lg break-all"}>{item.task}</p>
                </div>
                <div className='flex gap-2'>
                  <img onClick={() => handleEdit(item.id)} className='w-8 h-8 cursor-pointer p-1 border border-transparent hover:border-cyan-950 hover:rounded-md' src='src\assets\edit.png' />
                  <img onClick={() => handleDelete(item.id)} className='w-8 h-8 cursor-pointer p-1 border border-transparent hover:border-cyan-950 hover:rounded-md' src='src\assets\delete.png' />
                </div>
              </div>
            ))}

            {showCompleted && tasks.filter(item => item.isCompleted).length === 0 && tasks.length > 0 && <div className='text-center text-lg my-10'>No Completed Task Available</div>}
            {showCompleted && tasks.filter(item => item.isCompleted).map(item => (
              <div key={item.id} className="card w-full flex justify-between items-center border border-cyan-950 rounded px-3 py-2 my-2">
                <div className='w-11/12 flex gap-3'>
                  <input name={item.id} onChange={handleCheckbox} type="checkbox" checked={item.isCompleted} />
                  <p className={item.isCompleted ? "line-through text-lg break-all" : "text-lg break-all"}>{item.task}</p>
                </div>
                <div className='flex gap-2'>
                  <img onClick={() => handleEdit(item.id)} className='w-8 h-8 cursor-pointer p-1 border border-transparent hover:border-cyan-950 hover:rounded-md' src='src\assets\edit.png' />
                  <img onClick={() => handleDelete(item.id)} className='w-8 h-8 cursor-pointer p-1 border border-transparent hover:border-cyan-950 hover:rounded-md' src='src\assets\delete.png' />
                </div>
              </div>
            ))}
          </div>
          <Footer />
        </div>
      </div>
    </>
  );
}

export default App;
