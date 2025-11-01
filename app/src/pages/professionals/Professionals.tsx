import React, { useEffect, useState } from "react";
import avatar from "../../assets/avatar.png";
import { AiOutlineTrophy } from "react-icons/ai";
import { FaLocationDot } from "react-icons/fa6";
import { LuClock9 } from "react-icons/lu";
import { IoPersonSharp } from "react-icons/io5";
import { Link, useSearchParams } from "react-router-dom";
import { useGetProfessionalsQuery, useGetLocationsQuery } from "@/api/prosApi";
import { toAbsoluteUrl } from "@/utils/strapi";

const Professionals = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(
    searchParams.get("search") || ""
  );
  const [selectedLocation, setSelectedLocation] = useState(
    searchParams.get("location") || ""
  );

  useEffect(() => {
    const params = new URLSearchParams();
    if (searchQuery) params.append("search", searchQuery);
    if (selectedLocation) params.append("location", selectedLocation);
    setSearchParams(params, { replace: true });
  }, [searchQuery, selectedLocation, setSearchParams]);

  const {
    data: pros,
    isLoading,
    error,
  } = useGetProfessionalsQuery(
    searchQuery || selectedLocation
      ? {
          search: searchQuery || undefined,
          location: selectedLocation || undefined,
        }
      : undefined
  );

  // Fetch all unique locations
  const { data: locations } = useGetLocationsQuery();

  if (isLoading)
    return (
      <div className="h-screen w-full flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-blue-100" />
      </div>
    );
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
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="border border-gray-100 w-full py-3 rounded-md lg:rounded-tl-md lg:rounded-bl-md lg:rounded-tr-none lg:rounded-br-none px-2 shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-100 focus:shadow-lg transition-all bg-white"
            placeholder="What service do you need?"
            data-testid="search-input"
          />
          <select
            value={selectedLocation}
            onChange={(e) => setSelectedLocation(e.target.value)}
            className="border border-gray-100 py-3 px-2 rounded-md lg:rounded-none w-full shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-100 focus:shadow-lg transition-all bg-white"
            data-testid="location-select"
          >
            <option value="">All Locations</option>
            {locations?.map((location) => (
              <option key={location} value={location}>
                {location}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex justify-between items-center py-6">
        <p data-testid="result-count" className="font-normal text-base">
          {!pros || pros.length === 0
            ? "No professionals found"
            : `${pros.length} professional${pros.length !== 1 ? "s" : ""} found`}
        </p>
        {(searchQuery || selectedLocation) && (
          <button
            data-testid="clear-filters"
            onClick={() => {
              setSearchQuery("");
              setSelectedLocation("");
            }}
            className="text-blue-100 hover:text-blue-600 text-sm underline transition-colors"
          >
            Clear filters
          </button>
        )}
      </div>

      <p className="text-center py-6 font-normal text-base">
        The House Cleaners near you
      </p>
      <div className="grid gap-6" data-testid="pros-list">
        {pros.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg shadow-sm">
            <p className="text-gray-500 text-lg">
              No professionals match your search criteria
            </p>
            <p className="text-gray-400 text-sm mt-2">
              Try adjusting your filters
            </p>
          </div>
        ) : (
          pros.map((pro) => {
            const {
              id,
              name,
              about,
              address,
              phone_number,
              email,
              location,
              hires,
              years_in_business,
              employees,
              images, // single component
            } = pro;

            const imgSrc = images?.thumbnail_url ?? images?.image_url ?? "";
            const displayAddress = address ?? location ?? "Not provided";

            return (
              <article
                key={id}
                className="lg:p-4 bg-[#EEEEEE]"
                data-testid="pro-card"
              >
                <div className="flex flex-col justify-center lg:justify-around lg:flex-row items-center gap-4 lg:gap-12 border-gray-100 shadow-sm bg-white p-4 lg:p-10 rounded-lg mb-6 lg:mb-0">
                  <div className="w-full lg:w-[20%] flex justify-center items-center">
                    <img
                      data-testid="pro-image"
                      src={imgSrc ? toAbsoluteUrl(imgSrc) : avatar}
                      alt={name}
                      className="w-32 h-32 rounded-full object-cover"
                      loading="lazy"
                    />
                  </div>

                  {/* Second element: 60% */}
                  <div className="w-full lg:w-[60%] pt-8 lg:pt-0">
                    <h2
                      data-testid="pro-name"
                      className="text-text-black-3 font-semibold text-lg"
                    >
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

                      <li className="flex items-center gap-2">
                        <IoPersonSharp className="text-blue-100 text-xl" />
                        <span>
                          <strong>Employees:</strong> {phone_number ?? "—"}
                        </span>
                      </li>

                      <li className="flex items-center gap-2">
                        <IoPersonSharp className="text-blue-100 text-xl" />
                        <span>
                          <strong>Employees:</strong> {email ?? "—"}
                        </span>
                      </li>
                    </ul>

                    {about && <p className="text-sm text-gray-700">{about}</p>}
                  </div>
                  <div className="w-full lg:w-[20%] flex justify-center items-start">
                    <Link
                      to={`/professionals/${pro.documentId ?? pro.id}`}
                      data-testid="view-profile-btn"
                      className="bg-blue-100 p-3 rounded-md w-full max-w-[170px] text-white hover:bg-blue-600 transition-colors text-center block"
                    >
                      View profile
                    </Link>
                  </div>
                </div>
              </article>
            );
          })
        )}
      </div>
    </div>
  );
};

export default Professionals;
