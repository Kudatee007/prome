import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";
import avatar from "../../assets/avatar.png";
import { AiOutlineTrophy } from "react-icons/ai";
import { FaLocationDot } from "react-icons/fa6";
import { LuClock9 } from "react-icons/lu";
import { IoPersonSharp } from "react-icons/io5";

const ProfessionalProfile = () => {
  const navigate = useNavigate();
  return (
    <div className="bg-[#EEEEEE] p-4 lg:py-6 lg:px-25">
      <div className="flex items-center gap-2 text-[#2F2F2F] hover:text-[#00b8f1] transition-colors duration-200 pb-6">
        <IoArrowBack className="text-lg" />
        <Link to="/" className="font-semibold text-xl" onClick={() => navigate(-1)}>
          Back
        </Link>
      </div>

      <div className="flex gap-8 items-center pt-2 pb-4 lg:pt-4 lg:pb-8">
        <img src={avatar} alt="Professional Image" className="w-30 h-30 lg:w-50 lg:h-50" />
        <div>
          <h2 className="text-black-100 font-medium text-2xl">
            World Best Cleaning Pros
          </h2>
          <p className="text-xl">House Cleaning</p>
        </div>
      </div>

      <div>
        <div className="">
          <h3 className="text-black-100 font-medium text-xl border-b py-2 mb-4">
            About
          </h3>
          <div>
            <p className="introduction mb-2">
              <span className="font-semibold text-xl">Introduction:</span> World
              Best Cleaning Pros is a professional cleaning and fumigation
              service. Founded in 2008, we provide top-quality cleaning for
              homes, offices, and commercial spaces.
            </p>

            <p className="about mb-4">
              <span className="font-semibold text-xl">About:</span> Our team
              blends experienced professionals with young innovators. We
              prioritize customer satisfaction through regular communication and
              timely service delivery. You can reach us anytime for tailored
              cleaning solutions to fit your schedule.
            </p>

            <h4 className="font-semibold text-xl pb-2">Overview</h4>
            <ul className="space-y-3 text-[#2F2F2F]">
              <li className="flex items-center gap-2">
                <AiOutlineTrophy className="text-blue-100 text-xl" />
                <span>
                  <strong>100 hires</strong> on ProLinker
                </span>
              </li>

              <li className="flex items-start gap-2">
                <FaLocationDot className="text-blue-100 text-lg mt-[2px]" />
                <span>
                  <strong>Address:</strong> No 7, Isaac John Street, Ikeja,
                  Lagos State
                </span>
              </li>

              <li className="flex items-center gap-2">
                <LuClock9 className="text-blue-100 text-xl" />
                <span>
                  <strong>Years in business:</strong> 14
                </span>
              </li>

              <li className="flex items-center gap-2">
                <IoPersonSharp className="text-blue-100 text-xl" />
                <span>
                  <strong>Employees:</strong> 15
                </span>
              </li>
            </ul>

            <div className="py-4">
              <h4 className="font-semibold text-xl">Payment Methods:</h4>
              <ul>
                <li>Cash</li>
                <li>Bank Transfer</li>
                <li>Card</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfessionalProfile;
