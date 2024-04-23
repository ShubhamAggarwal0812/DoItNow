import { useState } from 'react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className="container mx-auto bg-sky-200 min-h-screen">
        <div className="main mx-auto bg-sky-300 min-h-screen w-1/2">
          <Navbar />
          <div className="new-task my-5 px-3">
            <h1 className='text-lg font-bold text-cyan-950'>New Task</h1>
            <input className='w-full outline-none rounded-sm border border-cyan-950 p-2' type="text" placeholder='Enter Your Task (min 3 characters)' />
            <div className='flex justify-end gap-3 my-3'>
              <button className='bg-cyan-600 px-2 py-1 border rounded text-white hover:bg-cyan-700'>Save</button>
              <button className='bg-cyan-600 px-2 py-1 border rounded text-white hover:bg-cyan-700'>Update</button>
            </div>
          </div>
          <hr></hr>
          <div className='mx-3 min-h-80'>
            <h1 className='text-center text-xl font-semibold my-3'>Your Tasks</h1>
            <div className="card flex justify-between items-center border border-cyan-950 rounded px-3 py-2 my-2">
              <div className='flex gap-3'>
                <input type="checkbox" name="isDone" id="checkDone" />
                <p className='text-lg'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti assumenda ipsa unde illo, dolore vitae similique autem ab. Sit eum earum beatae magnam quam corporis, delectus iusto nostrum voluptatibus quas.</p>
              </div>
              <div className='flex w-1/3 justify-around'>
                <img className='w-6 h-6' src='src\assets\edit.png'/>
                <img className='w-6 h-6' src='src\assets\delete.png'/>
              </div>
            </div>
          </div>
          <Footer />
        </div>
      </div>
    </>
  )
}

export default App
