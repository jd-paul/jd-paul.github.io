"use client";

import React, { useState } from "react";
import ProfileA from "../assets/img/img_customer-a.jpeg";
import Background from "../assets/img/img_city.jpg";

// Static style objects at module scope — created once, never re-created on render
const CARD_WRAPPER_STYLE = { perspective: "1500px" };
const FLIP_BASE_STYLE = {
  transformStyle: "preserve-3d",
  transitionProperty: "transform",
  transitionDuration: "0.6s",
  transitionTimingFunction: "ease-in-out",
};
const FACE_HIDDEN_FRONT_STYLE = {
  backfaceVisibility: "hidden",
  transform: "rotateY(0deg)",
};
const FACE_HIDDEN_BACK_STYLE = {
  backfaceVisibility: "hidden",
  transform: "rotateY(180deg)",
};
const BANNER_STYLE = { backgroundImage: `url(${Background})` };

function ProfileCard() {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleCardClick = () => {
    setIsFlipped(!isFlipped);
  };

  const flipStyle = {
    ...FLIP_BASE_STYLE,
    transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
  };

  return (
    <div className="flex items-center justify-center font-work-sans">
      <div
        className="relative w-full h-[300px] cursor-pointer"
        style={CARD_WRAPPER_STYLE}
        onClick={handleCardClick}
      >
        {/* Flip Container */}
        <div className="relative w-full h-full" style={flipStyle}>
          {/* Front Side */}
          <div
            className="absolute inset-0 w-full h-full bg-neutral-900 border border-neutral-800 overflow-hidden shadow-2xl rounded-xl"
            style={FACE_HIDDEN_FRONT_STYLE}
          >
            {/* Banner */}
            <div
              className="h-48 relative bg-cover bg-center bg-no-repeat rounded-t-xl"
              style={BANNER_STYLE}
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
                  className="w-full h-full object-cover"
                  loading="lazy"
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
            style={FACE_HIDDEN_BACK_STYLE}
          ></div>
        </div>
      </div>
    </div>
  );
}

export default React.memo(ProfileCard);
