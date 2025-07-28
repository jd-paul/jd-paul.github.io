import React from "react";
import Sidebar from "./SideBar";
import Section1 from "./Section1";
import Section5 from "./Section5";

const LandingPage = () => {
  return (
    <div className="min-h-screen text-white">
      <div className="grid grid-cols-1 lg:grid-cols-[400px_1fr]">
        <Sidebar />
        <div className="space-y-8 bg-[#0a0a0a]">
          <Section1 />
          <Section5 />
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
