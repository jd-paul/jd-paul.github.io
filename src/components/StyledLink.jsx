import React from 'react';

const StyledLink = ({ href, children }) => {
  return (
    <p className="text-md font-normal font-bitter text-custom-accent_alt leading-normal block tracking-normal mt-2 transition transform motion-reduce:transition-none motion-reduce:hover:transform-none">
      <a
        href={href}
        className="relative inline-block underline transition-colors duration-200 ease-in-out hover:no-underline hover:text-neutral-300"
      >
        {children}
      </a>
    </p>
  );
};

export default StyledLink;
