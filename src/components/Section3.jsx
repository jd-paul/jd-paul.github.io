import React from "react";
import City from "../assets/img/img_city.jpg";
import Slider from "./Slider";

const Section3 = () => {
  return (
    <div>
      <div className="flex flex-col relative font-work-sans items-stretch justify-center bg-neutral-900 py-16 px-4">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${City})`, filter: "brightness(20%)" }}
        ></div>

        <div className="flex flex-col gap-1 w-full max-w-7xl px-6 md:px-8 mx-auto mt-2">
          <div className="inline-grid grid-cols-1 auto-rows-auto gap-1">
            <div className="flex flex-col items-center justify-center p-2 z-10">
              <span className="text-center font-bold text-custom-accent_main text-xl md:text-2xl leading-tight block tracking-wider">
                How I can help
              </span>
              <span className="text-center font-semibold text-white text-3xl md:text-4xl leading-tight block tracking-tighter">
                Services I offer.
              </span>

              <p className="text-center font-medium font-bitter text-gray-300 text-xl md:text-2xl leading-tight block tracking-tight mt-4">
                Enjoy a set of services that will allow your business to excel
              </p>
            </div>
            <div className="flex items-center justify-center">
              <Slider />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Section3;
