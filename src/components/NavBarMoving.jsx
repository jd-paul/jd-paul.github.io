import React, { useState, useEffect } from 'react';
import { Link as ScrollLink, animateScroll as scroll } from 'react-scroll';

const NavBarMoving = () => {
  const [scrolledPastThreshold, setScrolledPastThreshold] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > window.innerHeight * 0.3) {
        setScrolledPastThreshold(true);
      } else {
        setScrolledPastThreshold(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Function to handle smooth scroll to contact section
  const scrollToContact = () => {
    scroll.scrollToBottom({
      smooth: true,
      duration: 500,
    });
  };

  return (
    <div className={`fixed top-0 left-0 w-full z-50 transition-all duration-200 font-space-grotesk font-bold text-lg bg-custom-dark_alt_light ${scrolledPastThreshold ? 'bg-custom-accent text-white py-4 px-6 shadow-md' : 'opacity-0 pointer-events-none'}`}>
      <div className="container mx-auto flex justify-between items-center">
        <ScrollLink
          activeClass="text-custom-accent_main"
          to="portfolioSection"
          spy={true}
          smooth={true}
          duration={500}
          className="flex items-center text-white hover:text-custom-accent_main transition duration-200 cursor-pointer"
        >
          Portfolio
        </ScrollLink>
        <div className="flex space-x-4">
          <ScrollLink
            activeClass="text-custom-accent_main"
            to="aboutSection"
            spy={true}
            smooth={true}
            duration={500}
            className="hidden md:block bg-transparent text-white px-4 py-2 rounded-md hover:bg-custom-accent hover:text-custom-accent_main transition duration-200 cursor-pointer"
          >
            About
          </ScrollLink>
          <button
            onClick={scrollToContact}
            className="px-4 py-2 rounded-md transition duration-200 bg-custom-accent text-white border border-white hover:bg-custom-accent_main hover:border-transparent hover:text-black cursor-pointer"
          >
            Contact
          </button>
        </div>
      </div>
    </div>
  );
};

export default NavBarMoving;
