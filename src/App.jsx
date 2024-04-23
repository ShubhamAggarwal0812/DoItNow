import { useState } from 'react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className="container mx-auto bg-sky-200 h-screen">
        <div className="main mx-auto bg-sky-300 h-full w-1/2">
          <Navbar />
          <Footer />
        </div>
      </div>
    </>
  )
}

export default App
