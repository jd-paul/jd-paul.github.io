import React from 'react';
import StyledLink from './StyledLink';

const Section5 = () => {
    return (
        <div className="bg-neutral-900 relative font-work-sans" id="contactSection">
            <div className="py-16 px-4 md:px-12">
                <div className="grid grid-cols-1 md:grid-cols-7 gap-6 text-white">
                    <div className="md:col-span-3">
                        <blockquote className="text-md font-normal italic font-bitter text-neutral-300 leading-relaxed">
                            “You can't connect the dots looking forward; you can only connect them looking backwards. So you have to trust that the dots will somehow connect in your future.”
                        </blockquote>
                    </div>
                    <div className="md:col-span-2 mt-8 md:mt-0">
                        <div className="flex flex-col justify-center items-center text-center">
                            <h1 className="text-xl font-semibold">Stay Connected</h1>
                            <StyledLink href="https://github.com/jd-paul">
                                https://github.com/jd-paul
                            </StyledLink>
                            <StyledLink href="https://www.linkedin.com/in/paul-san-diego/">
                                https://www.linkedin.com/in/paul-san-diego/
                            </StyledLink>
                        </div>
                    </div>
                    <div className="md:col-span-2 mt-8 md:mt-0">
                        <div className="flex flex-col justify-left items-center">
                            <h1 className="text-xl font-semibold">Location</h1>
                            <p className="text-md font-normal font-bitter text-neutral-300 leading-normal mt-2">
                                Great Britain, London
                            </p>
                            <h1 className="text-xl font-semibold mt-3">Email</h1>
                            <p className="text-md font-normal font-bitter text-neutral-300 leading-normal mt-2">
                                johnpaul20030@gmail.com
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="text-neutral-300 text-center py-8 font-bitter">
                Software engineer based in London · United Kingdom
            </div>
        </div>
    );
};

export default Section5;
