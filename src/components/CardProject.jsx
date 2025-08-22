"use client";

import { useState } from "react";
import ProfileA from "../assets/img/img_customer-a.jpeg";
import Background from "../assets/img/img_city.jpg";

export default function ProfileCard() {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleCardClick = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div className="flex items-center justify-center font-work-sans">
      <div
        className="relative w-full h-[300px] cursor-pointer"
        style={{ perspective: "1500px" }}
        onClick={handleCardClick}
      >
        {/* Flip Container */}
        <div
          className="relative w-full h-full"
          style={{
            transformStyle: "preserve-3d",
            transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
            transitionProperty: "transform",
            transitionDuration: "0.6s",
            transitionTimingFunction: "ease-in-out",
          }}
        >
          {/* Front Side */}
          <div
            className="absolute inset-0 w-full h-full bg-neutral-900 border border-neutral-800 overflow-hidden shadow-2xl rounded-xl"
            style={{
              backfaceVisibility: "hidden",
              transform: "rotateY(0deg)",
            }}
          >
            {/* Banner */}
            <div
              className="h-48 relative bg-cover bg-center bg-no-repeat rounded-t-xl"
              style={{ backgroundImage: `url(${Background})` }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/30 to-transparent rounded-t-xl"></div>
            </div>

            {/* Header */}
            <div className="text-center -mt-20 relative z-10 pb-4 px-6">
              {/* Avatar */}
              <div className="relative w-[120px] h-[120px] mx-auto mb-6 rounded-full overflow-hidden border border-neutral-800">
                <img
                  src={ProfileA}
                  alt="Person"
                  className="w-full h-full object-cover" /* fills and crops */
                />
              </div>

              <h1 className="text-3xl text-white mb-2 font-space-grotesk">
                Project Name
              </h1>
              <p className="text-neutral-400 text-lg">Python • Java</p>
            </div>

            {/* Content */}
            <div className="px-6 pb-6">
              {/* Bio */}
              <div className="text-center">
                <p className="text-neutral-300 leading-relaxed text-xs">
                  Brief explanation
                </p>
              </div>

              {/* Divider */}
              <div className="w-full h-px bg-neutral-700 my-6"></div>

              {/* Links */}
              <div className="flex justify-center">
                <a
                  href="https://github.com/jd-paul"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-neutral-400 hover:text-white transition-colors"
                >
                  Github Link
                </a>
              </div>
            </div>
          </div>

          {/* Back Side */}
          <div
            className="absolute inset-0 w-full h-full bg-neutral-900 border border-neutral-800 overflow-hidden shadow-2xl rounded-xl"
            style={{
              backfaceVisibility: "hidden",
              transform: "rotateY(180deg)",
            }}
          ></div>
        </div>
      </div>
    </div>
  );
}
