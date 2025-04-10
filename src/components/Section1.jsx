import React from "react";
import NavBar from "./NavBar";
import Selfie from "../assets/img/img_profile.png";
import Concrete from "../assets/img/img_working.png";
import BottomLogos from "./BottomLogos";

const Section1 = () => {
  return (
    <div
      className="min-h-[48rem] h-screen relative font-work-sans z-0"
      id="landingSection"
    >
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${Concrete})`,
          filter: "brightness(25%)",
          backgroundAttachment: "fixed",
        }}
      ></div>
      <NavBar />
      <BottomLogos />
      <div className="absolute inset-0 flex justify-center items-center px-6 md:px-8">
        <div className="w-full max-w-7xl flex flex-col items-center">
          <img
            src={Selfie}
            alt="Selfie"
            className="rounded-md h-48 md:h-64 object-cover mb-4"
          />

          {/* Text content */}
          <div className="text-white text-center px-6">
            <span className="font-space-grotesk font-bold text-custom-accent_main md:text-4xl text-3xl leading-tight block">
              Hej!
            </span>
            <p className="font-space-grotesk font-bold md:text-5xl text-4xl mt-[0.5rem] text-shadow-xl">
              I'm Paul San Diego
            </p>
            <p className="font-bold text-xl mt-[0.1rem] text-shadow-xl">
              | PAL Leader @ KCL | Website Manager | 2nd Year CS Student |
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Section1;
