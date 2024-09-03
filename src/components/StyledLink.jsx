import React from 'react';

const StyledLink = ({ href, children }) => {
  return (
    <p className="text-md font-normal font-bitter text-neutral-300 leading-normal block tracking-normal mt-2 transition transform motion-reduce:transition-none motion-reduce:hover:transform-none">
      <a
        href={href}
        className="relative inline-block text-neutral-300 hover:text-white"
        style={{
          textDecoration: 'none',
        }}
      >
        {children}
      </a>
    </p>
  );
};

export default StyledLink;
