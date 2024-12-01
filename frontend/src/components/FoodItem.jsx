import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaRegStar, FaShoppingCart } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux"
import { addToCart } from "../app/slices/cartSlice"
import toast from 'react-hot-toast';
import { SiTicktick } from "react-icons/si";

const FoodItem = ({ food }) => {
  const { idMeal, strMealThumb, strMeal } = food;
  const navigate = useNavigate();
  const [price, setPrice] = useState(Number(idMeal.slice(1, 4)))
  const dispatch = useDispatch()
  const user = useSelector(state => state.auth.user)
  const cartItems = useSelector(state => state.cart.value)
  const token = localStorage.getItem('token')
  const isInCart = cartItems.some(item => item.idMeal === idMeal);

  const handleAddToCart = async () => {

    if (!user) {
      return toast.error("You are not logged in.")
    }
    let foodData = {
      idMeal,
      strMeal,
      strMealThumb,
      price
    }

    try {

      const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/cart/add`, {
        method: "POST",
        headers: {
          "authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(foodData)
      })
      const data = await res.json()
      if (data.success) {

        dispatch(addToCart(foodData))
      
        toast.success(data.message)
      } else {
        toast.error(data.message)
      }


    } catch (error) {
      console.log(error)
    }
  }


  return (
    <div className="lg:w-1/4 md:w-1/2 px-4 py-2 md:px-0 w-full header-content ">
      <div className='relative '>
        <img
          alt="food"
          className="object-cover object-center w-full h-48 "
          src={strMealThumb}
          loading='lazy'
        />

        <button className='absolute top-2 right-2 text-orange-500 bg-white p-2 rounded-full' onClick={handleAddToCart}>
          {
            isInCart ?
              <SiTicktick /> :
              <FaShoppingCart />
          }
        </button>

        <div className="py-3 px-3 rounded-b-xl">
          <div className='flex items-center gap-1 justify-between text-orange-500'>
            <h2
              className="text-lg text-gray-800 hover:underline cursor-pointer"
              onClick={() => navigate(`/meal/${idMeal}`)}
            >
              {strMeal}
            </h2>
            <div className='flex gap-0.5 justify-center items-center bg-green-700 text-white rounded-lg text-sm px-1'>
              <span>4.2</span>
              <FaRegStar size={12} />
             
            </div>
          </div>
          <p className='text-orange-500 text-lg font-semibold '>
          ₹ {price}
          </p>
        </div>
      </div>
    </div>
  );
}

export default FoodItem;
