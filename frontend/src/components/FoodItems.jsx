import React from 'react'
import FoodItem from './FoodItem'
import useFetchOneCategory from '../hooks/useFetchOneCategory'
import { useSelector } from 'react-redux'

const FoodItems = () => {
    useFetchOneCategory()
    const {items,category} = useSelector(state=>state.food)
    return (
        <section>

            <div className="container my-10  mx-auto">
                <h2 className='text-3xl   font-semibold text-center mb-5'>{category}</h2>
                   
                <div className="flex  flex-wrap">
                  {
                    items?.map((item)=>{
                        return <FoodItem key={item.idMeal}  food={item}/>
                    })
                  }



                </div>
            </div>
        </section>

    )
}

export default FoodItems
