import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLink } from '@fortawesome/free-solid-svg-icons';

import productivityImage from '../assets/img/img_productivity-app.png';
import safetyImage from '../assets/img/img_safety-app.png';
import kcltech from '../assets/img/img_kcl-tech.png';
import codingTutors from '../assets/img/img_coding-tutors.png';

const Section4 = () => {
    const projects = [
        {
            title: 'Gamified Productivity App',
            description: 'Built a MERN stack productivity application that gamifies tasks through retro 2-bit design. Includes real-time tracking, customizable goals, and streak-based rewards to boost user productivity.',
            proj_img: productivityImage,
            project_link: 'https://github.com/WMK15/EXPerience',
        },
        {
            title: 'KCL Tech Hub',
            description: 'Modernized the database and legacy code for KCL Tech. The redesign boosted engagement by 40% and increased professionalism, as well as helping the society secure over £10,000 in sponsorship funding.',
            proj_img: kcltech,
            project_link: 'https://www.kcltech.co.uk/',
        },
        {
            title: 'London Safety app',
            description: 'Developed a hackathon application that helps users stay safe and informed about nearby crimes in their location. Achieved runner-up position.',
            proj_img: safetyImage,
            project_link: 'https://github.com/jd-paul/FirstYear-Hackathon',
        },
        {
            title: 'Coding Tutors Dashboard',
            description: 'Developed a full-stack dashboard application using Django with role-based access for admins, tutors, and students. Key features include lesson scheduling, a ticketing system, user management, and secure login. Admins oversee operations, tutors track lessons, and students manage requests and view progress.',
            proj_img: codingTutors,
            project_link: 'https://jpaul.pythonanywhere.com/',
        },
    ];

    return (
        <div>
            <div className="relative flex font-work-sans items-stretch justify-center bg-neutral-100 py-16">
                <div className="flex flex-col w-full max-w-[100rem] mx-6">

                    <span className="text-center font-semibold text-custom-dark_alt_light text-3xl md:text-4xl leading-tight block tracking-tighter">
                        My projects.
                    </span>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-6">
                        {projects.map((project, index) => (
                            <div key={index} className="bg-white shadow-md rounded-lg overflow-hidden">
                                {project.proj_img && (
                                    <div className="w-full h-64 overflow-hidden">
                                        <img
                                            src={project.proj_img}
                                            alt={project.title}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                )}
                                <div className="p-6">
                                    <div className="flex items-center mb-2">
                                        {project.project_link && (
                                            <a href={project.project_link} target="_blank" rel="noopener noreferrer" className="flex items-center text-custom-dark_alt_light mr-2">
                                                <FontAwesomeIcon icon={faLink} className="mr-2" />
                                                <h3 className="text-xl font-bold">{project.title}</h3>
                                            </a>
                                        )}
                                    </div>
                                    <p className="text-sm text-gray-700">{project.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Section4;
