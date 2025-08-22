import React from "react";
import Sidebar from "../components/SideBar";

import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

import food from "../assets/img/img_food.png";
import banner from "../assets/img/img_bohol.jpg";

const LandingPage = () => {
  return (
    <div className="min-h-screen text-white">
      <div className="grid grid-cols-1 lg:grid-cols-[400px_1fr]">
        <Sidebar />
        <div className="space-y-8 bg-[#0a0a0a]">
          <section className="p-6 font-work-sans" id="about">
            <div className="flex justify-between items-center mb-3 mt-6">
              <h2 className="text-2xl font-space-grotesk">About Me</h2>
              <Link to="/" style={{ textDecoration: "none" }}>
                <button
                  className="flex items-center gap-1 border px-3 py-2.5 border-white text-white rounded-lg text-sm hover:bg-white hover:text-black transition"
                  aria-label="Back to home"
                >
                  Back Home
                  <ArrowLeft className="w-4 h-4" />
                </button>
              </Link>
            </div>

            {/* Image */}
            <div className="relative flex justify-center bg-white rounded-lg max-h-[200px] overflow-hidden">
              {/* Overlay */}
              <div className="absolute inset-0 bg-black opacity-40 z-10 rounded-lg" />

              <img
                src={banner}
                alt="Banner"
                className="w-full h-auto object-cover rounded-lg"
              />
            </div>

            {/* Put 3 columns here. Just basic */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              <div>
                <h2 className="text-4xl">Soup for Thought</h2>
                <p className="text-neutral-300 pt-3">August 22, 2025</p>
              </div>
              <div>
                <p>
                  Hi, welcome to my about page ☺. I'm a passionate developer
                  that loves utilizing data. Friends call me a jack of all
                  trades, but I prefer the term "data enthusiast."
                </p>
                <p className="mt-1.5">
                  Data dictates every step I make when developing or working on
                  any project.
                </p>
              </div>

              <div>
                <p className="">
                  I am very passionate for learning and experiencing. My
                  'projects' page paint a picture of a technical person, but I
                  also enjoy working in all sorts of jobs.
                </p>
                <p className="mt-1.5">
                  Previously, I have worked as a waiter, a tutor, an IT tech
                  bar, and as a host for several events at my university. I
                  really enjoy working with people.
                </p>
                <p className="mt-1.5">
                  Lastly, I love Filipino food. I cooked some nice soup here to
                  the right! It's nice for winter.
                </p>
              </div>
              <div className="relative flex justify-center bg-white rounded-lg overflow-hidden">
                <div className="absolute inset-0 bg-black opacity-20 z-10" />
                <img
                  src={food}
                  alt="Sinigang"
                  className="w-full max-h-[400px] object-cover rounded-lg"
                />
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
