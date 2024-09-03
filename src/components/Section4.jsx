import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLink } from '@fortawesome/free-solid-svg-icons';

import productivityImage from '../assets/img/img_productivity-app.png';
import safetyImage from '../assets/img/img_safety-app.png';
import kcltech from '../assets/img/img_kcl-tech.png';


const Section4 = () => {
    const projects = [
        { 
            title: 'Productivity App', 
            description: 'A productivity app developed through a MERN stack. Gamifies productivity through 2-bit elements.', 
            proj_img: productivityImage,
            project_link: 'https://github.com/WMK15/EXPerience',
        },
        { 
            title: 'KCL Tech', 
            description: "Managed and designed the website of KCL Tech, one of London's most popular technology societies for students.", 
            proj_img: kcltech,
            project_link: 'https://www.kcltech.co.uk/',
        },
        { 
            title: 'London Safety app', 
            description: 'Created a hackathon output an app that helps users stay safe and notified about nearby crimes in London.', 
            proj_img: safetyImage,
            project_link: 'https://github.com/jd-paul/FirstYear-Hackathon',
        },
        // Add more projects here
    ];

    return (
        <div>
            <div className="relative flex font-work-sans items-stretch justify-center bg-neutral-100 py-16 px-4">
                <div className="flex flex-col gap-1 w-full max-w-[100rem] mx-6">
                    <span className="text-center font-semibold text-custom-dark_alt_light text-4xl leading-tight block tracking-tighter">
                        My projects.
                    </span>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
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
