import React from "react";
import servicesIcon from "../assets/servicesIcons.png";
import ServiceCarousel from "../component/ServiceCarousel";
import { useGetAllCategoriesQuery } from "../api/servicesApi";
import { Link } from "react-router-dom";

const Home = () => {
  const { data: categories } = useGetAllCategoriesQuery();

  return (
    <div className="">
      <div className="space-y-12 px-4 py-8 lg:px-22 lg:py-10">
        {/* Popular Services */}
        <ServiceCarousel
          category="PopularService"
          title="Popular Services"
          data-testid="carousel-PopularService"
        />

        {/* Home Improvement */}
        <ServiceCarousel
          category="Home Improvement"
          title="Home Improvement Services"
          data-testid="carousel-Home Improvement"
        />

        {/* Events Services */}
        <ServiceCarousel
          category="EventService"
          title="Event Services"
          data-testid="carousel-EventService"
        />

        {/* Design & Web Services */}
        <ServiceCarousel
          category="WebService"
          title="Design & Web Services"
          data-testid="carousel-WebService"
        />
      </div>

      {/* Browse all services by category */}
      <section className="bg-[#EEEEEE]">
        <div className="px-4 py-8 lg:px-22 lg:py-10">
          <h3 className="text-black-100 text-2xl pb-6 font-semibold">
            Browse all services
          </h3>
          <div className="flex flex-wrap justify-around gap-6 md:gap-12">
            {categories?.map((category) => (
              <Link
                key={category}
                to={`/professionals?category=${category}`}
                className="flex flex-col justify-center items-center space-y-2 hover:opacity-80 transition-opacity"
              >
                <div className="bg-white rounded-full w-fit p-6">
                  <img src={servicesIcon} alt={category} />
                </div>
                <p className="text-center">{category}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
