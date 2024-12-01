import React from 'react'
import { Link } from 'react-router-dom'
import { CiFacebook, CiTwitter, CiLinkedin } from "react-icons/ci";
const Footer = () => {
    return (
        <footer className='bg-orange-500 text-white py-10'>
            <div className='container md:p-5 p-2 mx-auto flex flex-wrap'>
                <div className='lg:w-1/3 md:w-1/2 w-full flex p-3 flex-col gap-3'>
                    <Link to={"/"} className='text-3xl font-bold'>MealMate</Link>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima autem at hic dicta placeat atque doloribus nostrum eveniet amet alias, laboriosam in quos quod nulla obcaecati deserunt asperiores molestiae. Est!</p>
                    <div className='flex items-center gap-3 '>
                        <CiFacebook size={25} />
                        <CiTwitter size={25} />
                        <CiLinkedin size={25} />
                    </div>
                </div>
                <div className='lg:w-1/3 md:w-1/2 p-3 w-full  flex flex-col gap-3'>
                    <h2 className='text-3xl font-bold'>Company</h2>
                    <Link to={"/"}>Home</Link>
                    <Link to={"/"}>About</Link>
                    <Link to={"/"}>Delivery</Link>
                    <Link to={"/"}>Privacy Policy</Link>
                </div>
                <div className='lg:w-1/3 md:w-1/2 w-full p-3 flex flex-col gap-3'>
                    <h2 className='text-3xl font-bold'>Get in touch</h2>
                    <p>+1-123-454-678</p>
                    <p>contact@gmail.com</p>
                </div>
            </div>
        </footer>
    )
}

export default Footer
