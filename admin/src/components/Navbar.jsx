import React from 'react'
import { assets } from '../assets/assets'

const Navbar = ({ setToken }) => {
  return (
    <div className='flex items-center py-2 px-[4%] justify-between'>
      <div className='flex items-center'>
       
        <span className='text-lg font-semibold ml-2'>Verdant Vault</span>
      </div>
      <button 
        onClick={() => setToken('')} 
        className='bg-gray-600 text-white px-5 py-2 sm:px-7 sm:py-2 rounded-full text-xs sm:text-sm'
      >
        Logout
      </button>
    </div>
  )
}

export default Navbar
