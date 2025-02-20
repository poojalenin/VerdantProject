import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
  return (
    <div>
      <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm'>

        <div>
        <div className='mb-5 w-32 text-center text-2xl font-bold text-black-600'>
  VerdantVault
</div>
          <p className='w-full md:w-2/3 text-gray-600'>At VerdantVault, we provide high-quality, eco-friendly products that promote sustainable living and make a positive impact on the planet.</p>
        </div>

        <div>
          <p className='text-xl font-medium mb-5'>COMPANY</p>
          <ul className='flex flex-col gap-1 text-gray-600'>
            <li>Home</li>
            <li>About us</li>
            <li>Delivery</li>
            <li>Privacy policy</li>
          </ul>
        </div>

        <div>
          <p className='text-xl font-medium mb-5'>GET IN TOUCH</p>
          <ul className='flex flex-col gap-1 text-gray-600'>
            <li>+91 88912-64429</li>
            <li>Contact@VerdantVault.com</li>
          </ul>
        </div>

      </div>

      <div>
        <hr />
        <p className='py-5 text-sm text-center'>Copyright 2024@ VerdantVault.com - All Right Reserved.</p>
      </div>

    </div>
  )
}

export default Footer
