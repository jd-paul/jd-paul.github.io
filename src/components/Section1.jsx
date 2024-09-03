import React from 'react';
import NavBar from "./NavBar";
import Selfie from '../assets/img/img_profile.png';
import Concrete from '../assets/img/img_working.jpg';
import BottomLogos from './BottomLogos';

const Section1 = () => {
    return (
        <div className="min-h-[48rem] h-screen relative font-work-sans z-0" id="landingSection">
            <div
                className="absolute inset-0 bg-cover bg-center"
                style={{
                    backgroundImage: `url(${Concrete})`,
                    filter: 'brightness(25%)',
                    backgroundAttachment: 'fixed'
                }}
            ></div>
            <NavBar />
            <BottomLogos />
            <div className="absolute inset-0 flex flex-col justify-center items-center">
                <img
                    src={Selfie}
                    alt="Selfie"
                    className="rounded-md h-64 object-cover mb-4"
                />

                {/* Text content */}
                <div className="text-white text-center px-6">
                    <span className="font-space-grotesk font-bold text-custom-accent_main text-3xl leading-tight block">
                        Hej!
                    </span>
                    <p className="font-space-grotesk font-bold text-6xl mt-2 text-shadow-xl">
                        I'm Paul San Diego
                    </p>
                    <p className="font-bold text-xl mt-3 text-shadow-xl">
                        | PAL Leader @ KCL | Website Manager | 2nd Year CS Student |
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Section1;
