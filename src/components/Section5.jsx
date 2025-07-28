import React from "react";
import StyledLink from "./StyledLink";

const Section5 = () => {
  return (
    <footer
      className="bg-[#1f1f1f] py-12 px-6 font-work-sans"
      id="contactSection"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-white">
        <div>
          <h3 className="text-xl font-semibold mb-4">Paul San Diego</h3>
          <p className="text-neutral-300 leading-relaxed">
            Let's work together!
          </p>
        </div>

        <div>
          <h4 className="text-lg font-semibold mb-4">Navigation</h4>
          <ul className="space-y-2 text-neutral-300 text-sm">
            <li>
              <StyledLink href="/about">About</StyledLink>
            </li>
            <li>
              <StyledLink href="/projects">Projects</StyledLink>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-lg font-semibold mb-4">Links</h4>
          <ul className="space-y-2 text-neutral-300 text-sm">
            <li>
              <StyledLink href="https://github.com/jd-paul">GitHub</StyledLink>
            </li>
            <li>
              <StyledLink href="https://www.linkedin.com/in/paul-san-diego/">
                LinkedIn
              </StyledLink>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-lg font-semibold mb-4">Contact</h4>
          <ul className="space-y-2 text-neutral-300 text-sm">
            <li>johnpaul20030@gmail.com</li>
            <li>London, United Kingdom</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-neutral-700 mt-12 pt-6 text-center text-neutral-400 text-sm">
        © 2025 Paul San Diego · Designed & Built by me
      </div>
    </footer>
  );
};

export default Section5;
