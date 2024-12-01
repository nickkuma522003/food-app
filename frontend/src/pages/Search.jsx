import React, { useState } from 'react'
import { CiSearch } from 'react-icons/ci'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import toast from "react-hot-toast"
const Search = () => {
    const categories = useSelector((state)=>state.food.categories)
    const [query,setQuery] = useState('')
    
   const navigate = useNavigate()
    const handleSubmit = async(e) =>{
      e.preventDefault()
      try{
        const res = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`)
        const data = await res.json()
        if(data.meals){
          navigate(`/meal/${data.meals[0].idMeal}`)
        }else{
          toast.error("meal not found.")
        }
      }catch(error){
        console.log(error)
      }
    }
  return (
    <div className='container mx-auto p-5'>
     <div className='lg:w-2/3 w-full mx-auto'>
     <form className='flex items-center px-4 py-2 border' onSubmit={handleSubmit}>
        <input type="text" placeholder='Search food ' value={query} onChange={(e)=>setQuery(e.target.value)} className='w-full text-lg outline-none' required/>
        <button type='submit'><CiSearch size={30}/></button>
      </form>
       <h2 className='mt-5 font-bold text-xl'>Popular Cuisines</h2>
       <div className='flex gap-5 overflow-x-auto items-center menu py-5'>
        {
            categories?.map((category)=>{
                return <div key={category.idCategory} className='text-center cursor-pointer'>
                  <div className='w-20 h-16 overflow-hidden bg-gray-100 rounded-full flex items-center justify-center'>
                  <img src={category.strCategoryThumb} alt="food"  className='w-full h-full object-cover object-center '/>
                  </div>
                    <span className='text-sm'>{category.strCategory}</span>
                </div>
            })
        }
       </div>
      
      </div>
    </div>
  )
}

export default Search
