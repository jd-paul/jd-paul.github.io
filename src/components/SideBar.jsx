import React from "react";
import { Github, Linkedin } from "lucide-react";
import Selfie from "../assets/img/img_profile.png";
import CssGridBackground from "./CssGridBackground";

const Sidebar = () => {
  return (
    <div className="lg:h-screen lg:max-h-screen relative lg:sticky top-0 overflow-hidden font-work-sans">
      {/* Background Pattern */}
      <CssGridBackground />

      {/* Sidebar Content */}
      <div className="space-y-8 p-6 relative z-10 h-full overflow-y-auto">
        {/* Profile Header */}
        <div className="flex items-center gap-4">
          <img
            src={Selfie}
            alt="Paul San Diego"
            className="rounded-full w-16 h-16 object-cover"
          />
          <div>
            <h1 className="text-2xl font-space-grotesk">Paul San Diego</h1>
            <p className="text-gray-400">Computer Science</p>
          </div>
        </div>

        {/* Bio */}
        <div className="space-y-6">
          <p className="text-gray-300 text-lg leading-relaxed">
            I'm a Computer Science student at King's College London. <br className="mb-1" />I
            solve problems using code and data. I'm passionate for converting
            complex information into useful solutions.
          </p>
          <button className="border border-white rounded-full px-4 py-2 text-sm hover:bg-white hover:text-black transition">
            More about Me
          </button>
        </div>

        {/* Social Links */}
        <div className="space-y-4">
          <div className="flex gap-4">
            <a
              href="https://linkedin.com/in/paul-san-diego/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white"
            >
              <Linkedin className="w-5 h-5" />
            </a>
            <a
              href="https://github.com/jd-paul"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white"
            >
              <Github className="w-5 h-5" />
            </a>
          </div>
          <div className="text-gray-400 text-sm">
            <p>johnpaul20030@gmail.com</p>
            <p>© 2025 Paul San Diego</p>
            <div className="flex gap-4">
              <a href="#" className="hover:text-white">
                Terms
              </a>
              <a href="#" className="hover:text-white">
                Contact
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
