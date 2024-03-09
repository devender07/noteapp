import React, { useState, useContext, useEffect } from 'react';
import { NoteContext } from '../context/NoteContext'
import { NavLink } from 'react-router-dom'

const Navbar = () => {
    const note = useContext(NoteContext);


    return (
        <nav className='w-full h-[4rem] flex justify-between items-center px-3 md:px-[5rem]  bg-slate-100 border-b sticky top-0'>
            <div>
                <NavLink to='/' className='px-5'><h2 className='text-xl'>Noteapp</h2></NavLink>
            </div>
            <div>
                <NavLink to='/' className='px-5 text-lg'>Home</NavLink>
                {
                    note.isLogin
                        ? <button className='px-2 py-1 border border-black mx-1 rounded  hover:bg-red-600 hover:border-red-500 hover:text-white text-lg' onClick={note.logout}>Logout</button>
                        : <NavLink to='/login' className='md:px-5 text-lg'>Login</NavLink>
                }


            </div>

        </nav>
    )
}

export default Navbar