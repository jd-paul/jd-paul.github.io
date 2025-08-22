import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons'; // Import brand icons from free-brands-svg-icons

const BottomLogos = () => {
  return (
    <div className="absolute bottom-0 left-0 w-full z-50 bg-transparent py-14 px-36 transition-all duration-200 font-bold text-lg">
      <div className="container mx-auto flex justify-center items-center">
        <div className="flex space-x-4 items-center">
          <button className="flex items-center bg-transparent text-white px-4 py-2 rounded-md hover:bg-custom-accent hover:text-custom-accent_main transition duration-200">
            <a href="https://github.com/jd-paul" target="_blank">
              <FontAwesomeIcon icon={faGithub} className="text-4xl mr-0" />
            </a>
          </button>
          <button className="flex items-center bg-transparent text-white px-4 py-2 rounded-md hover:bg-custom-accent hover:text-custom-accent_main transition duration-200">
            <a href="https://www.linkedin.com/in/paul-san-diego/" target="_blank">
              <FontAwesomeIcon icon={faLinkedin} className="text-4xl mr-0" />
            </a>
          </button>
        </div>
      </div>
    </div>
  );
};

export default BottomLogos;
