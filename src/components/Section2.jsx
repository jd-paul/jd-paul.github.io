import React from 'react';
import Selfie from '../assets/img/img_profile.png';
import ProgressBar from './ProgressBar';

const Section2 = () => {
  return (
    <div id="aboutSection">
      <div className="flex flex-col gap-1 w-full max-w-[100rem] mx-auto">
        <div className="relative flex flex-col font-work-sans items-stretch bg-red-white py-16">
          <span className="text-center font-bold text-custom-accent_alt text-2xl leading-tight block tracking-wider">
            ə'bout
          </span>
          <span className="text-center font-semibold text-custom-dark_alt_light text-4xl leading-tight block tracking-tighter">
            Let me introduce myself.
          </span>

          <img
            src={Selfie}
            alt="Selfie"
            className="rounded-full h-32 w-32 object-cover mb-4 mx-auto my-4"
          />

          <p className="mx-6 my-3 font-normal text-slate-600 text-2xl px-0 md:px-6">
            Hej! I'm Paul, a software engineer in the UK but originally from
            the Philippines. I have a passion for building all kinds of digital applications.
            I enjoy creating solutions to problems. <br />
          </p>

          <div className="relative font-work-sans mx-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col justify-start">
                <span className="text-left font-bold text-custom-dark_alt_light text-2xl leading-tight block tracking-normal mb-6 mt-4">
                  Profile.
                </span>
                <p className="font-normal text-slate-500 text-2xl mb-4">
                  Software engineer. <br />
                  PAL Leader @KCL. <br />
                  KCL Tech Website Manager. <br />
                </p>

                <p className="font-normal text-slate-500 text-2xl">
                  <span className="text-left font-bold font-bitter text-custom-dark_alt text-xl leading-tight block tracking-normal">
                    Name:
                  </span>
                  Paul San Diego
                  <span className="text-left font-bold font-bitter text-custom-dark_alt text-xl leading-tight block tracking-normal mt-3">
                    University:
                  </span>
                  King's College London

                  <span className="text-left font-bold font-bitter text-custom-dark_alt text-xl leading-tight block tracking-normal mt-3">
                    Current job:
                  </span>
                  <p className="">
                    Ambassador For KCL V.I.S.A
                  </p>
                  <p className="mt-1.5">
                    Tech Society Website Manager
                  </p>
                  <p className="mt-1.5">
                    PAL Leader (CS Tutor)
                  </p>
                </p>
              </div>
              <div className="flex flex-col justify-start items-start">
                <span className="text-left font-bold text-custom-dark_alt_light text-2xl leading-tight block tracking-normal mb-6 mt-4">
                  Skills.
                </span>

                <p className="font-normal text-slate-500 text-2xl mb-4">
                  Expertise in building complete and scalable applications. <br />
                </p>

                <span className="text-left font-bold font-bitter text-custom-dark_alt text-xl leading-tight block tracking-normal mb-1.5">
                  Java applications
                </span>
                <ProgressBar progress={70} />
                <span className="mb-2" />

                <span className="text-left font-bold font-bitter text-custom-dark_alt text-xl leading-tight block tracking-normal mb-1.5">
                  Web front end
                </span>
                <ProgressBar progress={85} />
                <span className="mb-2" />

                <span className="text-left font-bold font-bitter text-custom-dark_alt text-xl leading-tight block tracking-normal mb-1.5">
                  Business management systems
                </span>
                <ProgressBar progress={55} />
                <span className="mb-2" />

                <span className="text-left font-bold font-bitter text-custom-dark_alt text-xl leading-tight block tracking-normal mb-1.5">
                  Python, Java, C++
                </span>
                <ProgressBar progress={75} />
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
