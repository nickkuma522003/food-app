import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { setItems} from "../app/slices/foodSlice"

const useFetchOneCategory = () => {
   
   const dispatch = useDispatch()
   const {category} = useSelector(state=>state.food)
    useEffect(()=>{
      const fetchCategory = async() =>{
         try{
            const res = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`);
            const data = await res.json()
            dispatch(setItems(data.meals))
         }catch(error){
            console.log(error)
         }
      }
      fetchCategory()
    },[category])
    
}

export default useFetchOneCategory
