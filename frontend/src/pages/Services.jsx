import React from 'react'
import Service from '../components/Service'
import { CiAlarmOn, CiDeliveryTruck, CiPizza } from "react-icons/ci";
const Services = () => {
   const services = [
      {
         "title":"Free Delivery",
         "icon":<CiDeliveryTruck/>
      },
      {
         "title":"Fresh Food",
         "icon":<CiPizza/>
      },
      {
         "title":"Always Open",
         "icon":<CiAlarmOn/>
      },
   ]
  return (
   <section className="py-24">
    <h2 className='text-center text-3xl  font-bold mb-10'>Our Services</h2>
     <div className='container mx-auto flex flex-wrap px-5'>

       {
         services.map((service,index)=>{
            return <Service key={index} service={service}/>
         })
       }

     </div>
   </section>
  )
}

export default Services
