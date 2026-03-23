import React from 'react';
import { FaRocket } from 'react-icons/fa';
import { FaSearchengin } from 'react-icons/fa';
import { FaPencilRuler } from 'react-icons/fa';
import { FaPeopleArrows } from 'react-icons/fa6';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import './Carousel.css';

const responsive = {
    superLargeDesktop: {
        breakpoint: { max: 4000, min: 2500 },
        items: 4,
        partialVisibilityGutter: 30
      },
    desktop: {
        breakpoint: { max: 2500, min: 1024 },
        items: 3,
        partialVisibilityGutter: 30
    },
    tablet: {
        breakpoint: { max: 1024, min: 768 },
        items: 2,
        partialVisibilityGutter: 30
    },
    mobile: {
        breakpoint: { max: 768, min: 0 },
        items: 1,
        partialVisibilityGutter: 30
    }
};

// Static data at module scope — created once, never re-created on render
const data = [
    {
        title: `Application development`,
        Icon: FaRocket,
        paragraph: `Whether for mobile or desktop applications, I aim to create effective solutions for your needs.`,
    },
    {
        title: `SEO optimizations`,
        Icon: FaSearchengin,
        paragraph: `Utilize SEO strategies to enhance your online presence and reach your target audience.`,
    },
    {
        title: `Thoughtful design`,
        Icon: FaPencilRuler,
        paragraph: `Craft and promote a compelling public image that resonates with your audience.`,
    },
    {
        title: `Training and collaboration`,
        Icon: FaPeopleArrows,
        paragraph: `Experience in training colleagues and developers on adopting new technologies.`,
    },
];

const Slider = () => {
    return (
        <div className="w-full m-auto font-work-sans">
            <div className="mt-4">
                <Carousel
                    arrows={false}
                    swipeable={true}
                    showDots={true}
                    responsive={responsive}
                    ssr={false}
                    infinite={true}
                    keyBoardControl={false}
                    containerClass="carousel-container"
                    removeArrowOnDeviceType={["tablet", "mobile"]}
                    dotListClass="custom-dot-list-style"
                    focusOnSelect={true}
                >
                    {data.map((d) => (
                        <div key={d.title} className="h-[20rem] text-white rounded-xl m-1 ">
                            <div className="h-44 rounded-t-xl flex justify-center items-center">
                                <d.Icon className="h-24 w-24 text-gray-300" />
                            </div>

                            <div className="flex flex-col text-center items-center p-0">
                                <p className="text-xl font-semibold ">{d.title}</p>
                                <p className="text-md font-normal font-bitter text-gray-400 text-md leading-normal block tracking-normal mt-2">
                                    {d.paragraph}
                                </p>
                            </div>
                        </div>
                    ))}
                </Carousel>
            </div>
        </div>
    );
};

export default Slider;
