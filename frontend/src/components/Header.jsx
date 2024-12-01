import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
    return (

        <div className='container mx-auto header rounded-lg md:px-0 px-2 text-white '>
            <div className='overlay py-12 rounded-lg'>
            <div className='lg:w-1/2 px-5 w-full flex flex-col items-start  gap-3'>
                <h1 className='md:text-5xl text-3xl font-semibold  header-content'>Order your</h1>
                <h1 className='md:text-5xl text-3xl font-semibold  header-content'>favourite food here</h1>
                <p className='text-lg header-content'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro eligendi mollitia, odit dolor dicta animi. Incidunt vero, illum quidem reprehenderit, numquam hic officiis quae aspernatur voluptatibus autem recusandae quis labore.</p>
                <Link className='px-4 py-2 header-content bg-white text-black rounded-full' to={"/menu"}>view menu</Link>
            </div>
            </div>
          


        </div>
    )
}

export default Header
