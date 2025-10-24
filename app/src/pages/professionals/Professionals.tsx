import React from "react";
import avatar from "../../assets/avatar.png";
import { AiOutlineTrophy } from "react-icons/ai";
import { FaLocationDot } from "react-icons/fa6";
import { LuClock9 } from "react-icons/lu";
import { IoPersonSharp } from "react-icons/io5";
import { Link } from "react-router-dom";

const Professionals = () => {
  return (
    <div className="bg-[#EEEEEE] p-4 lg:py-6 lg:px-25">
      <div className="flex justify-center w-full">
        <div className="space-y-6 lg:space-y-0 lg:grid lg:grid-cols-[80%_auto] w-full max-w-[700px]">
          <input
            type="text"
            className="border border-[#2F2F2F4D] w-full py-3 rounded-md lg:rounded-tl-md lg:rounded-bl-md lg:rounded-tr-none lg:rounded-br-none px-2"
            placeholder="What service do you need?"
          />
          <select className="border border-[#2F2F2F4D] py-3 px-2 rounded-md lg:rounded-none w-full">
            <option value="lagos">Lagos</option>
            <option value="abuja">Abuja</option>
          </select>
        </div>
      </div>

      <p className="text-center py-6">The House Cleaners near you</p>

      <div className="flex flex-col justify-center items-center gap-4 px-2 py-8 lg:flex-row lg:px-8 lg:py-10 lg:gap-12 border-b border-[#fffdfd4d]">
        <img src={avatar} alt="Professional Image" className="w-50 h-50" />

        <div className="pt-8">
          <h2 className="text-text-black-3 font-semibond text-lg">
            World Best Cleaning Pros
          </h2>

          {/* <div className="">⭐⭐⭐⭐⭐ 4.9 (150 Reviews)</div> */}

          <ul className="space-y-3 my-4 text-[#2F2F2F]">
            <li className="flex items-center gap-2">
              <AiOutlineTrophy className="text-blue-100 text-xl" />
              <span>
                <strong>100 hires</strong> on ProLinker
              </span>
            </li>

            <li className="flex items-start gap-2">
              <FaLocationDot className="text-blue-100 text-lg mt-[2px]" />
              <span>
                <strong>Address:</strong> No 7, Isaac John Street, Ikeja, Lagos
                State
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

          <p className="">
            Our team blends experienced professionals with young innovators. We
            prioritize customer satisfaction through regular communication and
            timely service delivery. You can reach us anytime for tailored
            cleaning solutions to fit your schedule.
          </p>
        </div>

        <Link to="/professional-profile" className="w-full max-w-[170px]">
          <button className="bg-blue-100 p-3 rounded-md w-full text-white">
            View profile
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Professionals;
