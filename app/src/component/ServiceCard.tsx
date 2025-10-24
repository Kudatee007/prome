import React from "react";
import { Link } from "react-router-dom";
import cardImg from "../assets/cardImg.png";

const ServiceCard = () => {
  return (
    // <div className='bg-[#EEEEEE] w-full min-w-[230px] rounded-lg'>
    //     <img src={cardImg} alt="" className='rounded-lg w-full h-[190px]'/>
    //     <p className='text-[22px] leading-6 text-center py-6'>House Cleaning Service</p>
    // </div>
    <Link to="/professionals" className="block">
      <div className="bg-[#EEEEEE] w-full min-w-[230px] rounded-lg hover:shadow-md transition-shadow duration-200">
        <img
          src={cardImg}
          alt="House Cleaning Service"
          className="rounded-lg w-full h-[190px] object-cover"
        />
        <p className="text-[22px] leading-6 text-center py-6 text-black">
          House Cleaning Service
        </p>
      </div>
    </Link>
  );
};

export default ServiceCard;
