import React from "react";
import servicesIcon from "../assets/servicesIcons.png";
import ServiceCarousel from "../component/ServiceCarousel";

const Home = () => {
  return (
    <div className="">
      <div className="space-y-12 px-4 py-8 lg:px-22 lg:py-10">
        <ServiceCarousel />

        {/* Popular Services */}
        <ServiceCarousel />

        {/* Events Services */}
        <ServiceCarousel />

        {/* Design & Web Services */}
        <ServiceCarousel />
      </div>

      {/* Services */}
      <section className="bg-[#EEEEEE]">
        <div className="px-4 py-8 lg:px-22 lg:py-10">
          <h3 className="text-black-100 text-2xl pb-6 font-semibold">
            Browse all services
          </h3>
          {/* <div className="flex flex-col justify-center space-y-2">
            <div className="bg-white rounded-full w-fit p-6">
              <img src={servicesIcon} alt="" />
            </div>
            <p>Beauty Services</p>
          </div> */}
          <div className="flex flex-wrap gap-6 md:gap-12">
            {[...Array(10)].map((_, i) => (
              <div key={i} className="flex flex-col justify-center space-y-2">
                <div className="bg-white rounded-full w-fit p-6">
                  <img src={servicesIcon} alt="" />
                </div>
                <p>Beauty Services</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
