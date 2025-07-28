import React from "react";
import { Link as LinkIcon } from "lucide-react"; // Rename to avoid conflict

const StyledLink = ({ href, children }) => {
  return (
    <p className="text-md font-normal font-work-sans text-blue-400 leading-normal block tracking-normal mt-2 transition transform motion-reduce:transition-none motion-reduce:hover:transform-none">
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="relative inline-flex items-center gap-1 transition-colors duration-200 ease-in-out hover:no-underline hover:text-neutral-300"
      >
        <LinkIcon className="w-4 h-4" />
        {children}
      </a>
    </p>
  );
};

export default StyledLink;
