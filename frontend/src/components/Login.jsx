import React, { useState } from 'react'
import { IoMdClose } from 'react-icons/io'
import toast from 'react-hot-toast'
import { useDispatch } from 'react-redux'
import { setUser } from '../app/slices/authSlice'
import { setCart } from '../app/slices/cartSlice'


const Login = ({setShowLogin}) => {
    const [currState,setCurrState] = useState("Login")
    const [loading,setLoading] = useState(false)
     const dispatch = useDispatch()
    const initialData = {
      fullName:"",
      email:"",
      password:""
    }
    const [data,setData] = useState(initialData)

    const handleChange = (e) =>{
      const {name,value} = e.target;

      setData(prev=>({...prev,[name]:value}))
    }

  const handleSubmit = async(e) =>{
    e.preventDefault()
    let url =`${import.meta.env.VITE_SERVER_URL}`
    if(currState==="Login"){
      url += "/api/user/login" 
    }else{
      url+="/api/user/register"
    }
    try{
      setLoading(true)

      const res = await fetch(url,{
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify(data)
      });
      const resData = await res.json()
      if(resData.success){

        setData(initialData)
        localStorage.setItem('token',resData.token)
        dispatch(setUser(resData.user))
        dispatch(setCart(resData.user.cart))
        toast.success(resData.message)   
        
        setShowLogin(false)
        
      }else{
        toast.error(resData.message)
      }
    }catch(error){
      console.log(error)
      toast.error("Error !")
    }finally{
      setLoading(false)
    }

  }

  return (
    <div className='w-full h-screen fixed z-10 top-0 left-0 flex items-center justify-center p-5 overlay'>
       <div className='lg:w-1/3  md:w-1/2  w-full p-5 bg-white rounded-lg'>
        <div className='mb-5 flex items-center justify-between'>
           <h2 className='text-2xl font-semibold'> {currState}</h2>
           
            <IoMdClose size={23} className='cursor-pointer' onClick={()=>setShowLogin(false)}/>
           
        </div>
          <form className='flex flex-col gap-3' onSubmit={handleSubmit}>
            
         {
            currState !== "Login" &&   <input type="text" placeholder='Your name' name='fullName' value={data.fullName} onChange={handleChange} className='px-4 py-2 border'  required/> 
         }
          <input type="email" placeholder='Your email'  name='email' value={data.email} onChange={handleChange}  className='px-4 py-2 border'  required/>
          <input type="password" placeholder='Your password'  name='password' value={data.password} onChange={handleChange}  className='px-4 py-2 border'  required/>
          <button type='submit' className='px-4 py-2  bg-orange-500 hover:bg-orange-600 rounded-lg text-white'>{loading ? 'Loading...' : currState}</button>
          {
            currState == "Login" ? <p>Create a new account ? <button type='button' className='text-orange-500' onClick={()=>setCurrState('Sign Up')}>Click here</button></p>: <p>Already have an account ? <button type='button' className='text-orange-500' onClick={()=>setCurrState("Login")}>Login</button></p>
          }
          </form>
        </div>
    </div>
  )
}

export default Login
