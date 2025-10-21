import React from 'react'
import cardImg from "../assets/cardImg.png"

const ServiceCard = () => {
  return (
    <div className='bg-[#EEEEEE] w-full min-w-[230px] rounded-lg'>
        <img src={cardImg} alt="" className='rounded-lg w-full h-[190px]'/>
        <p className='text-[22px] leading-6 text-center py-6'>House Cleaning Service</p>
    </div>
  )
}

export default ServiceCard