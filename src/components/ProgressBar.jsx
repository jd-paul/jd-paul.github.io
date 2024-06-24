import React from 'react';

const ProgressBar = ({ progress }) => {
  return (
    <div className="w-full bg-slate-300 h-5 overflow-hidden relative">
      <div
        className="bg-custom-accent_alt h-full"
        style={{ width: `${progress}%` }}
      ></div>
      <div className="absolute inset-0 flex items-center justify-center text-white text-sm font-bold">
        {progress}%
      </div>
    </div>
  );
};

export default ProgressBar;
