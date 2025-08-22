import React from "react";
import { useState } from "react";

import { ArrowRight, ArrowDownLeft } from "lucide-react";
import { Link } from "react-router-dom";

import Conference from "../assets/img/img_working.png";
import CustomerA from "../assets/img/img_customer-a.jpeg";
import CustomerB from "../assets/img/img_gsyp-logo.png";
import CustomerC from "../assets/img/img_customer-c.jpg";

import kcltech from "../assets/img/img_kcl-tech.png";
import codingTutors from "../assets/img/img_coding-tutors.png";
import resumeIQ from "../assets/img/img_resume-iq.jpg";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPython,
  faJava,
  faReact,
  faDocker,
  faGithub,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";

import { faFeather } from "@fortawesome/free-solid-svg-icons"; // for Apache

import Modal from "./Modal";

const Section1 = () => {
  const [showModal, setShowModal] = useState(false);
  const techStack = [
    { name: "Python", icon: faPython, color: "#3776AB" },
    { name: "Java", icon: faJava, color: "#007396" },
    { name: "React", icon: faReact, color: "#61DBFB" },
    { name: "Docker", icon: faDocker, color: "#2496ED" },
    { name: "GitHub", icon: faGithub, color: "#181717" },
    { name: "Numpy", icon: null, color: "#013243" },
    { name: "Supabase", icon: null, color: "#3ECF8E" },
    { name: "Apache Commons Math", icon: faFeather, color: "#D42029" },
    { name: "Adobe", icon: null, color: "#FF0000" },
  ];

  return (
    <section className="p-6 font-work-sans" id="about">
      {/* Projects */}
      <div className="flex justify-between items-center mb-3 mt-6">
        <h2 className="text-2xl font-space-grotesk">My Projects</h2>
        <Link to="/projects" style={{ textDecoration: "none" }}>
          <button
            className="flex items-center gap-1 border px-3 py-2.5 border-white text-white rounded-lg text-sm hover:bg-white hover:text-black transition"
            aria-label="Back to home"
          >
            My Projects
            <ArrowRight className="w-4 h-4" />
          </button>
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {[
          {
            img: resumeIQ,
            name: "Resume IQ: Python, Classical Machine Learning",
            url: "https://github.com/jd-paul/resume-iq",
          },
          {
            img: kcltech,
            name: "KCL Tech Hub",
            url: "https://www.kcltech.co.uk/",
          },
          {
            img: codingTutors,
            name: "Tutor Student Management System",
            url: "https://github.com/jd-paul/tutor-management-system",
          },
        ].map((project, i) => (
          <a
            key={i}
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="relative group block min-h-[180px] max-h-[300px] overflow-hidden rounded-lg"
          >
            <img
              src={project.img}
              alt={project.name}
              className="w-full h-full object-cover bg-white"
            />
            {/* Gradient overlay */}
            <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-black/65 group-hover:from-black/75 to-transparent transition-colors z-10" />
            {/* Caption */}
            <div className="absolute bottom-3 left-0 right-0 z-20 px-6">
              <p className="text-white text-sm font-semibold">{project.name}</p>
            </div>
          </a>
        ))}
      </div>

      {/* Stack */}
      <div className="bg-blue-600 rounded-xl p-6 mt-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl text-white font-space-grotesk">My Stack</h2>
        </div>

        <div className="flex gap-3 flex-wrap">
          {techStack.map((tech, idx) => (
            <div
              key={idx}
              title={tech.name}
              className="flex items-center justify-center rounded-md px-3 py-2 text-sm font-semibold bg-white"
              style={{ color: tech.color }}
            >
              {tech.icon ? (
                <FontAwesomeIcon icon={tech.icon} className="mr-2 w-4 h-4" />
              ) : null}
              {tech.name}
            </div>
          ))}
        </div>
      </div>

      {/* Me */}
      <div className="flex justify-between items-center mt-6"></div>

      <div className="relative w-full aspect-[3/2] max-h-[450px] overflow-hidden rounded-lg">
        {/* Overlay */}
        <div className="absolute inset-0 bg-black opacity-40 z-10" />

        {/* Arrow Button */}

        <Link to="/about" style={{ textDecoration: "none" }}>
          <button
            className="flex items-center gap-1 absolute right-4 top-4 text-white  rounded-lg px-3 py-2 text-sm hover:bg-white hover:text-black transition z-20"
            aria-label="About Me"
          >
            About Me
            <ArrowRight className="w-4 h-4" />
          </button>
        </Link>

        {/* Background Image */}
        <img
          src={Conference}
          alt="Paul presenting"
          className="w-full h-full object-cover object-bottom"
        />
      </div>

      {/* Contact and Clients Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-6">
        {/* Contact Section */}
        <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-gray-900 to-gray-700 p-6">
          <h2 className="text-2xl mb-4">Contact</h2>
          <button
            onClick={() => setShowModal(true)}
            className="flex items-center gap-1 absolute right-4 top-4 text-white rounded-lg px-3 py-2 text-sm hover:bg-white hover:text-black transition z-20"
            aria-label="More Contacts"
          >
            More Contacts
            <ArrowDownLeft className="w-4 h-4" />
          </button>
        </div>

        {/* Happy Clients Section */}
        <div className="bg-neutral-900 rounded-xl p-6">
          <div className="flex items-center gap-2 mb-2">
            {[...Array(5)].map((_, i) => (
              <svg
                key={i}
                className="w-5 h-5 text-yellow-400 fill-current"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
          <h3 className="text-4xl font-bold mb-4">100%</h3>
          <p className="text-neutral-400">Happy Clients</p>

          <div className="flex -space-x-2 mt-4">
            {[CustomerA, CustomerB, CustomerC].map((src, i) => (
              <img
                key={i}
                src={src}
                alt={`Client ${i + 1}`}
                className="w-10 h-10 rounded-full border-2 border-white object-cover"
              />
            ))}
          </div>
        </div>
      </div>

      <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
        <h2 className="text-xl font-semibold mb-4">Other Contact Info</h2>
        <p className="text-sm mb-4">
          You can reach me via LinkedIn, Email, or find my socials below.
        </p>

        <div className="flex gap-4 flex-wrap">
          {/* GitHub */}
          <a
            href="https://github.com/jd-paul"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-lg text-blue-800 hover:text-neutral-800 transition"
          >
            <FontAwesomeIcon icon={faGithub} className="w-5 h-5" />
            <span className="text-sm">github.com/jd-paul</span>
          </a>

          {/* LinkedIn */}
          <a
            href="https://www.linkedin.com/in/paul-san-diego/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-lg text-blue-800 hover:text-neutral-800 transition"
          >
            <FontAwesomeIcon icon={faLinkedin} className="w-5 h-5" />
            <span className="text-sm">linkedin.com/in/paul-san-diego</span>
          </a>
        </div>
      </Modal>
    </section>
  );
};

export default Section1;
