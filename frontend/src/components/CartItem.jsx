import { useDispatch } from "react-redux"
import {removeFromCart} from "../app/slices/cartSlice"
import toast from "react-hot-toast"
const CartItem = ({item}) => {
    const dispatch = useDispatch()
    const {idMeal,price, quantity,strMealThumb,strMeal} = item
    const token = localStorage.getItem('token')
    const handleRemoveFromCart = async() =>{
        try{
            const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/cart/remove/${idMeal}`,{
                method:"DELETE",
                headers:{
                    "authorization":`Bearer ${token}`
                }
            })
            const data = await res.json()
            if(data.success){
                dispatch(removeFromCart({idMeal}))
                toast.success(data.message)
                
            }
        }catch(error){  
            console.log(error)
        }
    }
    return (
        <div  className="flex text-center  border-b py-1 items-center ">
            <div className="w-1/4 flex gap-1 items-center">
                <img src={strMealThumb} alt="food" width={50} className="rounded-lg  " />
                <p className="md:block hidden ">{strMeal.slice(0, 20)}</p>
            </div>

            <div className="w-1/4">
                <p>₹ {price}</p>
            </div>
            <div className="w-1/4">
                1
            </div>
            <div className="w-1/4" >
                <button onClick={handleRemoveFromCart}>X</button>
            </div>
        </div>
    )
}

export default CartItem
