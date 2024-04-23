import React from 'react'

const Navbar = () => {
    return (
        <div className='bg-cyan-700 sticky top-0 w-full flex justify-between items-center px-3 py-2'>
            <div className='flex items-center'>
                <img src='favicon.ico' className='w-1/4'></img>
                <h1 className='text-xl'>DoItNow</h1>
            </div>
            <ul className='flex gap-3'>
                <li><a href=''>About</a></li>
                <li><a href = 'tel:+91 98765 43210'>Contact</a></li>
                <li><a href=''>Help</a></li>
            </ul>

        </div>
    )
}

export default Navbar
