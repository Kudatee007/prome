import React, { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import ServiceCard from "./ServiceCard";

const ServiceCarousel = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: false,
    align: "start",
  });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

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
  return (
    <div>
      <section>
        <h2 className="text-black-100 text-2xl pb-6 font-semibold">
          Popular Services
        </h2>
        <div className="embla overflow-hidden" ref={emblaRef}>
          <div className="embla__container flex">
            {[...Array(10)].map((_, i) => (
              <div
                key={i}
                className="
              embla__slide 
              min-w-0
              flex items-center justify-center
              p-[6px]
              flex-[0_0_90%]   /* mobile: 1 slide per view */
              lg:flex-[0_0_20%] /* desktops: ~3.5 slides */
            "
              >
                <ServiceCard />
              </div>
            ))}
          </div>

          {/* Pagination dots — visible only on mobile */}
          <div className="flex justify-center mt-4 gap-2 md:hidden">
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
