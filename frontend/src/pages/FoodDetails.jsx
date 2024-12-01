import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import YouTube from "react-youtube";
import { IoMdClose, IoMdPlay } from "react-icons/io";

const FoodDetails = () => {
    const { id } = useParams()
    const [meal, setMeal] = useState(null)
    const [steps, setSteps] = useState([])
    const [showVideo, setShowVideo] = useState(false)


    useEffect(() => {
        window.scrollTo(0, 0)
        const fetchMeal = async () => {
            try {
                const res = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
                const data = await res.json()
                setMeal(data.meals[0])
                const instructions = data.meals[0].strInstructions.split('\n');
                setSteps(instructions.filter(instruction => instruction.trim()));


            } catch (error) {
                console.log(error)

            }
        }
        fetchMeal()
    }, [id])

    return (
        <div className='container mx-auto py-10'>

            <div className='lg:w-2/3 p-5 w-full mx-auto flex flex-col gap-4'>
                {
                    meal && <img src={meal.strMealThumb} alt="thumbnail" className='w-full md:h-96 h-64 object-cover rounded-lg object-center' />

                }

                {
                    showVideo && meal && <div className='h-screen fixed overlay w-full flex items-center justify-center  top-0 left-0 '>
                        <button onClick={() => setShowVideo(false)} className='fixed top-5 right-5'>
                            <IoMdClose size={25} />
                        </button>
                        <div className='lg:w-1/2 w-full p-5'>
                            <YouTube videoId={meal.strYoutube.split('=')[1]}  opts={{
                                width: '100%',
                                height: '350px',
                              
                            }} />
                        </div>
                    </div>
                }
                <div className='flex w-full  items-center gap-5 justify-between flex-wrap'>
                    <h2 className='text-3xl font-bold'>{meal && meal.strMeal}</h2>
                    <button onClick={() => setShowVideo(true)} className='bg-[#FF0F1C] flex items-center gap-1  text-white w-fit px-4 py-2 rounded-lg'>
                        <IoMdPlay />
                        Watch Video</button>
                </div>
                <h2 className='text-xl font-bold'>Category : {meal && meal.strCategory}</h2>
                <h3 className="text-xl font-semibold">Ingredients:</h3>
                {
                    meal && <div className='flex items-center gap-3 overflow-x-auto menu'>
                        {Object.keys(meal)
                            .filter(key => key.includes('Ingredient') && meal[key])
                            .map((key, index) => (
                                <div key={index} className="bg-orange-500 hover:bg-orange-600 cursor-pointer text-white  min-w-fit px-3 py-1 rounded-md text-sm">
                                    {meal[key]}
                                </div>
                            ))}
                    </div>
                }

                <h3 className="text-xl font-semibold">Instructions:</h3>
                <ol>
                    {steps.map((step, index) => (
                        <li key={index} className="mb-2 text-lg">{step}</li>
                    ))}
                </ol>

            </div>
        </div>
    )
}

export default FoodDetails
