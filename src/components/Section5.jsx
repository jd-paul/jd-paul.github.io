import React from "react";
import StyledLink from "./StyledLink";

const Section5 = () => {
  return (
    <div
      className="bg-neutral-900 relative font-work-sans py-10 px-6 md:py-20"
      id="contactSection"
    >
      <div className="flex flex-col gap-4 w-full max-w-7xl mx-auto mt-2 px-6 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-white">
          <div className="flex flex-col items-start">
            <blockquote className="text-md md:text-md font-normal italic font-bitter text-neutral-300 leading-relaxed">
              Together, we can improve our future through coding.
            </blockquote>
          </div>
          <div className="flex flex-col items-start">
            <h1 className="text-lg md:text-xl font-semibold">Stay Connected</h1>
            <StyledLink href="https://github.com/jd-paul">
              https://github.com/jd-paul
            </StyledLink>
            <StyledLink href="https://www.linkedin.com/in/paul-san-diego/">
              https://www.linkedin.com/in/paul-san-diego/
            </StyledLink>
          </div>
          <div className="flex flex-col items-start">
            <h1 className="text-lg md:text-xl font-semibold">Location</h1>
            <p className="text-md md:text-md font-normal font-bitter text-neutral-300 leading-normal mt-2">
              Great Britain, London
            </p>
            <h1 className="text-lg md:text-xl font-semibold mt-3">Email</h1>
            <p className="text-md md:text-md font-normal font-bitter text-neutral-300 leading-normal mt-2">
              johnpaul20030@gmail.com
            </p>
          </div>
        </div>
      </div>
      <div className="text-neutral-300 text-center mt-10 font-bitter ">
        © 2024 Paul San Diego · United Kingdom · Designed by me
      </div>
    </div>
  );
};

export default Section5;
