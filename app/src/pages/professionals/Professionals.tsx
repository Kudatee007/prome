import React from "react";
import avatar from "../../assets/avatar.png";
import { AiOutlineTrophy } from "react-icons/ai";
import { FaLocationDot } from "react-icons/fa6";
import { LuClock9 } from "react-icons/lu";
import { IoPersonSharp } from "react-icons/io5";
import { Link } from "react-router-dom";
import { useGetProfessionalsQuery } from "@/api/prosApi";
import { toAbsoluteUrl } from "@/utils/strapi";

const Professionals = () => {
  const { data: pros, isLoading, error } = useGetProfessionalsQuery();

  if (isLoading) return <p data-testid="loading-state">Loading…</p>;
  if (error) {
    console.error("Error details:", error);
    return <p data-testid="error-state">Failed to load professionals</p>;
  }
  if (!pros || pros.length === 0) {
    return <p>No professionals found</p>;
  }

  return (
    <div className="bg-[#EEEEEE] p-4 lg:py-10 lg:px-25">
      <div className="flex justify-center w-full">
        <div className="space-y-6 lg:space-y-0 lg:grid lg:grid-cols-[80%_auto] w-full max-w-[700px]">
          <input
            type="text"
            name=""
            id=""
            className="border border-gray-100 w-full py-3 rounded-md lg:rounded-tl-md lg:rounded-bl-md lg:rounded-tr-none lg:rounded-br-none px-2 shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-100 focus:shadow-lg transition-all bg-white"
            placeholder="What service do you need?"
          />
          <select
            name=""
            id=""
            className="border border-gray-100 py-3 px-2 rounded-md lg:rounded-none w-full shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-100 focus:shadow-lg transition-all bg-white"
          >
            <option value="lagos">Lagos</option>
            <option value="abuja">Abuja</option>
          </select>
        </div>
      </div>

      <p className="text-center py-6 font-normal text-base">The House Cleaners near you</p>
      {pros?.map((pro) => {
        const {
          id,
          name,
          about,
          address,
          location,
          hires,
          years_in_business,
          employees,
          images, // single component
        } = pro;

        const imgSrc = images?.thumbnail_url ?? images?.image_url ?? "";
        const displayAddress = address ?? location ?? "Not provided";

        console.log(pro);

        return (
          <article
            key={id}
            className="lg:p-4 bg-[#EEEEEE]"
            data-testid="pro-card"
          >
            <div className="flex flex-col justify-center lg:justify-around lg:flex-row items-center gap-4 lg:gap-12 border-gray-100 shadow-sm bg-white p-4 lg:p-10 rounded-lg mb-6 lg:mb-0">
              <div className="w-full lg:w-[20%] flex justify-center items-center">
                <img
                  src={imgSrc ? toAbsoluteUrl(imgSrc) : avatar}
                  alt={name}
                  className="w-32 h-32 rounded-full object-cover"
                  loading="lazy"
                />
              </div>

              {/* Second element: 60% */}
              <div className="w-full lg:w-[60%] pt-8 lg:pt-0">
                <h2 className="text-text-black-3 font-semibold text-lg">
                  {name}
                </h2>
                <ul className="space-y-3 my-4 text-[#2F2F2F]">
                  <li className="flex items-center gap-2">
                    <AiOutlineTrophy className="text-blue-100 text-xl" />
                    <span>
                      <strong>{hires ?? 0} hires</strong> on ProLinker
                    </span>
                  </li>

                  <li className="flex items-start gap-2">
                    <FaLocationDot className="text-blue-100 text-lg mt-[2px]" />
                    <span>
                      <strong>Address:</strong> {displayAddress}
                    </span>
                  </li>

                  <li className="flex items-center gap-2">
                    <LuClock9 className="text-blue-100 text-xl" />
                    <span>
                      <strong>Years in business:</strong>{" "}
                      {years_in_business ?? "—"}
                    </span>
                  </li>

                  <li className="flex items-center gap-2">
                    <IoPersonSharp className="text-blue-100 text-xl" />
                    <span>
                      <strong>Employees:</strong> {employees ?? "—"}
                    </span>
                  </li>
                </ul>

                {about && <p className="text-sm text-gray-700">{about}</p>}
              </div>
              <div className="w-full lg:w-[20%] flex justify-center items-start">
                <Link
                  to={`/professionals/${pro.documentId}`}
                  className="w-full max-w-[170px]"
                >
                  <button className="bg-blue-100 p-3 rounded-md w-full text-white hover:bg-blue-600 transition-colors">
                    View profile
                  </button>
                </Link>
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
};

export default Professionals;
