import React, { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import ServiceCard from "./ServiceCard";
import { useGetServicesByCategoryQuery } from "@/api/servicesApi";

interface ServiceCarouselProps {
  category: string;
  title: string;
}

const ServiceCarousel = ({ category, title }: ServiceCarouselProps) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: false,
    align: "start",
  });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const { data: services, isLoading } = useGetServicesByCategoryQuery(category);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    setScrollSnaps(emblaApi.scrollSnapList());
    emblaApi.on("select", onSelect);
    onSelect(); // initial
  }, [emblaApi, onSelect]);

  if (isLoading) return <p>Loading {title}...</p>;
  if (!services || services.length === 0) return null;


  console.log(services);
  

  return (
    <div>
      <section>
        <h2 className="text-black-100 text-2xl pb-6 font-semibold">{title}</h2>
        <div className="embla overflow-hidden" ref={emblaRef}>
          <div className="embla__container flex">
            {services.map((service) => (
              <div
                key={service.documentId}
                className="
                embla__slide 
                min-w-0
                flex items-center justify-center
                p-1.5
                flex-[0_0_90%]      /* mobile: 1 slide */
    md:flex-[0_0_33.333%]  /* tablet: 3 slides */
               xl:flex-[0_0_20%] /* desktops: ~3.5 slides */
              "
              >
                <ServiceCard service={service} />
              </div>
            ))}
          </div>

          {/* Pagination dots — visible only on mobile */}
          <div className="flex justify-center mt-4 gap-2">
            {scrollSnaps.map((_, i) => (
              <button
                key={i}
                onClick={() => emblaApi && emblaApi.scrollTo(i)}
                className={`w-1.5 h-1.5 rounded-full transition-all ${
                  i === selectedIndex ? "bg-black scale-110" : "bg-gray-300"
                }`}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ServiceCarousel;
