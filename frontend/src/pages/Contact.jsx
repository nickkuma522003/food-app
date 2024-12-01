import React, { useState } from 'react'
import { CiMail,CiLocationOn,CiPhone } from "react-icons/ci";
import toast from "react-hot-toast"
const Contact = () => {
  const initialData = {
    username:"",
    email:"",
    message:""
  }
  const token = localStorage.getItem('token')
  const [formData,setFormData] = useState(initialData)
  const [loading,setLoading] = useState(false)

  const handleChange = (e) =>{
    const {name,value} = e.target;
    setFormData({
      ...formData,
      [name]:value
    })
  }
  const handleSubmit = async(e)=>{
  e.preventDefault()
    if(!token){
      return toast.error("Please login.")
    }
    try{
      setLoading(true)
      const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/contact/add`,{
        method:"POST",
        headers:{
          "Content-Type":"application/json",
          "authorization":`Bearer ${token}`
        },
        body:JSON.stringify(formData)
      })
      const data = await res.json()

      if(data.success){
        toast.success(data.message)
        setFormData(initialData)
      }else{
        toast.error(data.message)
      }
    }catch(error){
      toast.error("Network error.")
    }finally{
      setLoading(false)
    }
  }
  return (
    <div className='container px-5 py-24 mx-auto flex flex-wrap items-center '>
      <div className='lg:w-1/2 w-full'>
       <h2 className='text-3xl font-bold mb-5'>Contact Us</h2>
       <form onSubmit={handleSubmit} className='flex flex-col gap-3'>
        <input type="text" placeholder='Your name'  name='username' className='px-4 py-2 border rounded-lg' value={formData.username} onChange={handleChange} required/>
        <input type="email" placeholder='Your email' name='email' className='px-4 py-2 border rounded-lg' value={formData.email} onChange={handleChange} required/>
      <textarea  name='message' rows={5} value={formData.message} className='px-4 py-2 border rounded-lg' onChange={handleChange} required></textarea>
      <button type='submit' className='bg-orange-500 hover:bg-orange-600 px-4 py-2 text-white rounded-lg'>
        {
          loading ? 'Sending...' :'Send'
        }
      </button>
       </form>
      </div>
      <div className='lg:w-1/2 w-full flex pt-10 flex-col justify-center items-center gap-5'>
        <div className='flex items-center gap-4'>
          <div className='bg-orange-500 text-white p-2 rounded-full'>
            <CiMail size={30}/>
          </div>
          <div className='flex flex-col gap-1'>
            <h4 className='font-bold text-lg'>CHART TO US</h4>
            <p className='text-sm'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat, aut!</p>
            <p className='text-sm'>Lorem ipsum dolor sit amet.</p>
          </div>
          
        </div>
        <div className='flex items-center gap-4'>
          <div className='bg-orange-500 text-white p-2 rounded-full'>
            <CiLocationOn size={30}/>
          </div>
          <div className='flex flex-col gap-1'>
            <h4 className='font-bold text-lg'>OFFICE</h4>
            <p className='text-sm'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat, aut!</p>
            <p className='text-sm'>Lorem ipsum dolor sit amet.</p>
          </div>
          
        </div>
        <div className='flex items-center gap-4'>
          <div className='bg-orange-500 text-white p-2 rounded-full'>
            <CiPhone size={30}/>
          </div>
          <div className='flex flex-col gap-1'>
            <h4 className='font-bold text-lg'>PHONE</h4>
            <p className='text-sm'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat, aut!</p>
            <p className='text-sm'>Lorem ipsum dolor sit amet.</p>
          </div>
          
        </div>
      

      </div>
    </div>
  )
}

export default Contact
