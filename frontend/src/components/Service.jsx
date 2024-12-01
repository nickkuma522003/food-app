import React from 'react'

const Service = ({service}) => {
  return (
    <div className='lg:w-1/3 md:w-1/2 w-full flex flex-col items-center justify-center p-5  text-center'>
      <div className='text-4xl bg-orange-500 text-white rounded-full p-3 mb-3'>
        {service.icon}
      </div>
      <h2 className='text-2xl font-bold my-2'>{service.title}</h2>
      <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Odio soluta adipisci a iusto mollitia voluptate voluptatem, facere.</p>
    </div>
  )
}

export default Service
