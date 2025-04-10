import React from "react";
import Selfie from "../assets/img/img_profile.png";
import ProgressBar from "./ProgressBar";

const Section2 = () => {
  return (
    <div id="aboutSection">
      <div className="max-w-7xl mx-auto mt-2 px-6 md:px-8">
        <div className="relative flex flex-col font-work-sans items-stretch bg-red-white py-16 ">
          <span className="text-center font-bold text-custom-accent_alt text-xl md:text-2xl leading-tight block tracking-wider">
            ə'bout
          </span>
          <span className="text-center font-semibold text-custom-dark_alt_light text-3xl md:text-4xl leading-tight block tracking-tighter">
            Let me introduce myself.
          </span>

          <img
            src={Selfie}
            alt="Selfie"
            className="rounded-full h-32 w-32 object-cover mb-4 mx-auto my-4"
          />

          <p className="my-3 font-normal text-slate-600 text-xl md:text-2xl">
            Hej! I'm Paul, a software engineer in the UK but originally from the
            Philippines. I have a passion for building all kinds of digital
            applications. I enjoy creating solutions to problems. <br />
          </p>

          <div className="relative font-work-sans">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col justify-start">
                <span className="text-left font-bold text-custom-dark_alt_light text-2xl md:text-3xl leading-tight block tracking-normal mb-6 mt-4">
                  Profile.
                </span>
                <p className="font-normal text-slate-500 text-xl md:text-2xl mb-4">
                  Software engineer. <br />
                  PAL Leader @KCL. <br />
                  KCL Tech Website Manager. <br />
                </p>

                <p className="font-normal text-slate-500 text-xl md:text-2xl">
                  <span className="text-left font-bold font-bitter text-custom-dark_alt text-xl md:text-2xl leading-tight block tracking-normal">
                    Name:
                  </span>
                  Paul San Diego
                  <span className="text-left font-bold font-bitter text-custom-dark_alt text-xl md:text-2xl leading-tight block tracking-normal mt-3">
                    University:
                  </span>
                  King's College London
                  <span className="text-left font-bold font-bitter text-custom-dark_alt text-xl md:text-2xl leading-tight block tracking-normal mt-3">
                    Current job:
                  </span>
                  <ul className="ml-[0.5rem]">
                    <li>• Website manager of KCL Tech</li>
                    <li>• Maths and programming tutor</li>
                    <li>• King's Labs Pro Bono Software Engineer</li>
                    <li>• Voiz Academy Data Analyst Intern</li>
                  </ul>
                </p>
              </div>
              <div className="flex flex-col justify-start items-start">
                <span className="text-left font-bold text-custom-dark_alt_light text-2xl md:text-3xl leading-tight block tracking-normal mb-6 mt-4">
                  Skills.
                </span>

                <p className="font-normal text-slate-500 text-xl md:text-2xl mb-4">
                  Expertise in building robust applications. <br />
                </p>

                <span className="text-left font-bold font-bitter text-custom-dark_alt text-xl md:text-2xl leading-tight block tracking-normal mb-1.5">
                  Java applications
                </span>
                <ProgressBar progress={85} />
                <span className="mb-2" />

                <span className="text-left font-bold font-bitter text-custom-dark_alt text-xl md:text-2xl leading-tight block tracking-normal mb-1.5">
                  Full stack development
                </span>
                <ProgressBar progress={80} />
                <span className="mb-2" />

                <span className="text-left font-bold font-bitter text-custom-dark_alt text-xl md:text-2xl leading-tight block tracking-normal mb-1.5">
                  Data analysis, machine learning
                </span>
                <ProgressBar progress={90} />
                <span className="mb-2" />

                <span className="text-left font-bold font-bitter text-custom-dark_alt text-xl md:text-2xl leading-tight block tracking-normal mb-1.5">
                  Python, Java, C++
                </span>
                <ProgressBar progress={95} />
                <span className="mb-2" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Section2;
