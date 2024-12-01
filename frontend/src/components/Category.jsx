import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setCategory } from '../app/slices/foodSlice'

const Category = ({food}) => {
    const dispatch = useDispatch()
    const {category} = useSelector(state=>state.food)
    return (
        <div className={`text-center my-2 category bg-gray-100 category ${category === food.strCategory && 'bg-orange-500'}  rounded-lg  shadow p-3`} onClick={()=>dispatch(setCategory(food.strCategory))}>
            <img src={food.strCategoryThumb} alt={food.strCategory} loading='lazy'/>
            <h2 className="font-medium text-lg">
              {food.strCategory}
            </h2>
           
        </div>

    )
}

export default Category
