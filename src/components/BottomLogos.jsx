import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faLinkedin, faReadme } from '@fortawesome/free-brands-svg-icons'; // Import brand icons from free-brands-svg-icons

const BottomLogos = () => {
  return (
    <div className="absolute bottom-0 left-0 w-full z-50 bg-transparent py-14 px-36 transition-all duration-200 font-space-grotesk font-bold text-lg">
      <div className="container mx-auto flex justify-center items-center">
        <div className="flex space-x-4 items-center">
          <button className="flex items-center bg-transparent text-white px-4 py-2 rounded-md hover:bg-custom-accent hover:text-custom-accent_main transition duration-200">
            <FontAwesomeIcon icon={faGithub} className="text-4xl mr-0" />
          </button>
          <button className="flex items-center bg-transparent text-white px-4 py-2 rounded-md hover:bg-custom-accent hover:text-custom-accent_main transition duration-200">
            <FontAwesomeIcon icon={faLinkedin} className="text-4xl mr-0" />
          </button>
          <button className="flex items-center bg-transparent text-white px-4 py-2 rounded-md hover:bg-custom-accent hover:text-custom-accent_main transition duration-200">
            <FontAwesomeIcon icon={faReadme} className="text-4xl mr-0" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default BottomLogos;
