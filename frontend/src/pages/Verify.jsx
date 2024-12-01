import { useNavigate, useSearchParams } from 'react-router-dom'
import Loader from '../components/Loader'
import { useEffect } from 'react'

const Verify = () => {
    const [searchParams,setSearchParams] = useSearchParams()
    const success = searchParams.get("success")
    const orderId = searchParams.get("orderId")
    const navigate = useNavigate()

    const verifyPayment = async() =>{
        const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/order/verify`,{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({orderId,success})
        })
        const data = await res.json()

        if(data.success){
                navigate("/myorders")
        }else{
            navigate("/")
        }
    }

    useEffect(()=>{
        verifyPayment()
    },[])
  return (
    <div className='flex  items-center justify-center w-full h-screen'>
      <Loader/>
    </div>
  )
}

export default Verify
