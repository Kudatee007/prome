import React from "react";
import { Link } from "react-router-dom";
import cardImg from "../assets/cardImg.png";
import { toAbsoluteUrl } from "@/utils/strapi";
import type { Service } from "@/api/servicesApi";

interface ServiceCardProps {
  service: Service;
}

const ServiceCard = ({ service }: ServiceCardProps) => {
  const imageUrl = service.images?.image_url
    ? toAbsoluteUrl(service.images?.image_url)
    : cardImg;


    
  return (
    <Link to={`/professionals/${service.documentId}`} className="block">
    <div className="bg-[#EEEEEE] w-full min-w-[230px] rounded-lg hover:shadow-md transition-shadow duration-200">
      <img
        src={imageUrl}
        alt={service.name}
        className="rounded-lg w-full h-[190px] object-cover"
      />
      <p className="text-[22px] leading-6 text-center py-6 text-black">
        {service.name}
      </p>
    </div>
  </Link>
  );
};

export default ServiceCard;
