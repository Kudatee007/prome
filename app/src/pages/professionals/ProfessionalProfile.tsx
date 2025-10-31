import React from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";
import avatar from "../../assets/avatar.png";
import { AiOutlineTrophy } from "react-icons/ai";
import { FaLocationDot } from "react-icons/fa6";
import { LuClock9 } from "react-icons/lu";
import { IoPersonSharp } from "react-icons/io5";
import { useGetProfessionalQuery } from "@/api/prosApi";
import { toAbsoluteUrl } from "@/utils/strapi";

const ProfessionalProfile = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { data: pro, isLoading, error } = useGetProfessionalQuery(id!);

  if (isLoading) return <p data-testid="loading-state">Loading...</p>;
  if (error) return <p data-testid="error-state">Error loading professional</p>;
  if (!pro) return <p>Professional not found</p>;

  console.log(pro);
  const imgSrc = pro.images?.thumbnail_url ?? pro.images?.image_url ?? "";
  const displayAddress = pro.address ?? pro.location ?? "Not provided";

  return (
    <div className="bg-white p-5 lg:py-6 lg:px-25">
      <div className="flex items-center gap-2 text-[#2F2F2F] hover:text-blue-100 transition-colors duration-200 pb-6">
        <IoArrowBack className="text-lg" />
        <Link
          to="/"
          className="font-semibold text-xl"
          onClick={() => navigate(-1)}
        >
          Back
        </Link>
      </div>

      <div className="flex gap-8 items-center pt-2 pb-4 lg:pt-4 lg:pb-8">
        <img
          src={imgSrc ? toAbsoluteUrl(imgSrc) : avatar}
          alt={pro.name}
          className="w-32 h-32 rounded-full object-cover"
          loading="lazy"
        />
        <div>
          <h2 className="text-black-100 font-medium text-2xl">{pro.name}</h2>
          <p className="text-xl">{pro.category}</p>
        </div>
      </div>

      <div>
        <div className="">
          <h3 className="text-black-100 font-medium text-xl border-b py-1 mb-4">
            About
          </h3>
          <div>
            <p className="introduction mb-2">
              <span className="font-semibold text-xl">Introduction:</span>
              {pro.introduction}
            </p>

            <p className="about mb-4">
              <span className="font-semibold text-xl">About:</span>
              {pro.about}
            </p>

            <h4 className="font-semibold text-xl pb-2">Overview</h4>
            <ul className="space-y-3 text-[#2F2F2F]">
              <li className="flex items-center gap-2">
                <AiOutlineTrophy className="text-blue-100 text-xl" />
                <span>
                  <strong>{pro.hires ?? 0} hires</strong> on ProLinker
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
                  <strong>Years in business:</strong>
                  {pro.years_in_business ?? "—"}
                </span>
              </li>

              <li className="flex items-center gap-2">
                <IoPersonSharp className="text-blue-100 text-xl" />

                <span>
                  <strong>Employees:</strong> {pro.employees ?? "—"}
                </span>
              </li>
            </ul>

            <div className="py-4">
              <h4 className="font-semibold text-xl">Payment Methods:</h4>
              {pro.payment_methods?.map((payment, id) => {
                return (
                  <ul key={id}>
                    <li>{payment}</li>
                  </ul>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfessionalProfile;
