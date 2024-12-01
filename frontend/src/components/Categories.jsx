
import { useSelector } from 'react-redux'
import Category from './Category'

import useFetchCategory from '../hooks/useFetchCategory'



const Categories = () => {
    useFetchCategory()
    const {categories} = useSelector(state=>state.food)
    
   

    return (
        <div className='container mx-auto my-5  px-5 md:px-0  '>
           
            <div className='flex items-center overflow-x-scroll menu gap-5 ' >
                {
                    categories?.map((category)=>{
                       return <Category food={category} key={category.idCategory}/>
                    })
                }
            </div>
        </div>
    )
}

export default Categories
