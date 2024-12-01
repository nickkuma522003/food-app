import React from 'react'

const EmptyCart = () => {
  return (
    <div className='w-full py-24 flex items-center justify-center text-center '>
       
       <div className='lg:w-1/2  w-full p-5'>
       <img src="/empty-cart.avif" alt="empty-cart" width={250} className='mx-auto' />
       <h2 className='text-2xl py-2 font-semibold'>Your cart is empty</h2>
       <p>You can go to home page to view more restaurants.</p>
       </div>
        
       
    </div>
  )
}

export default EmptyCart
