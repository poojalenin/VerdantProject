import React from 'react'

const NewsletterBox = () => {
  return (
    <div className='text-center'>

      <p className='text-2xl font-medium text-gray-800'>Subscribe now & get 20% off</p>
      <p className='text-gray-400 mt-3'>At VerdantVault, we believe in the power of conscious living. Our mission is to provide you with high-quality, eco-friendly products that make a positive impact on the planet. Whether you're looking for reusable household items, natural personal care products, or sustainable fashion, we've got you covered.

We carefully curate each item in our collection to ensure it aligns with our core values of sustainability, ethical sourcing, and environmental responsibility. By shopping with us, you're not just making a purchase – you're making a difference. Join us on our journey toward a cleaner, greener future. </p>

      <form className='w-full sm:w-1/2 flex items-center gap-3 mx-auto my-6 border pl-3'>
        <input className='w-full sm:flex-1 outline-none' type="text" placeholder='Enter your email id' required />
        <button className='bg-black text-white text-xs px-10 py-4' type='submit'>SUBSCRIBE</button>
      </form>

    </div>
  )
}

export default NewsletterBox
