import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import {
  Checked,
  Email,
  Business,
  Pattern,
  Energy,
  Login,
  ResponsiveImg,
  Browser,
} from "../../pages/Images/index";

const ImageGallery = () => {
  const slides = [
    {
      title: "Real Time Availability",
      description:
        "Our software swiftly grants access to available meeting spaces. Elevate your meetings in real-time, experiencing seamless room reservations for heightened productivity and collaboration.",
      image: Checked,
    },
    {
      title: "Booking Notification",
      description:
        "It's a digital serenade, celebrating your prowess in securing meeting spaces.Enjoy the harmonious acknowledgment and let notifications sing the song of your booking brilliance.",
      image: Email,
    },
    {
      title: "Analytics Dashboard",
      description:
        "Unveiling valuable insights with a poised and professional touch",
      image: Business,
    },
    {
      title: "Usage Pattern",
      description:
        "It transforms raw usage data into strategic insights, orchestrating a symphony of patterns with precision and professionalism.Understanding user behavior and offering strategic clarity.",
      image: Pattern,
    },
    {
      title: "Powerful Integration",
      description:
        "Tech harmony reigns supreme with our powerful integrations. Seamlessly connect your tools in a symphony of productivity.Elevate your meeting experience by weaving a web of connections that enhance collaboration.",
      image: Energy,
    },
    {
      title: "User Friendly Interface",
      description:
        "Navigate effortlessly through our user-friendly interface. Meetings shouldn't be complicated, and neither should the tools you use. Enjoy a sleek and intuitive design that puts the focus on collaboration, not confusion.",
      image: Login,
    },
    {
      title: "Responsive",
      description:
        "No matter you are, our platform respe ur meeting needs. Whether on Goontop or mobile, experience the same seamless functionality. Meetings become flexible, just like our responsive design.",
      image: ResponsiveImg,
    },
    {
      title: "Open Source",
      description:
        "Unleash the potential of customization!Our open-source platform empowers you to tailor your meeting experience.It's not just software; it's a canvas for innovation and adaptability.",
      image: Browser,
    },
  ];

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 460, min: 0 },
      items: 1,
    },
  };

  return (
    <div className="bg-blue-600 mt-10">
      <h2 className="font-bold text-3xl text-white pl-10 pt-5">
        Navigate meetings with ease
      </h2>
      <p className="text-white pt-2 pl-10">
        Where Booking Spaces Transcends into Effortless Organization and
        Tracking
      </p>
      <div className="pt-10">
        <Carousel
          responsive={responsive}
          infinite={true}
          autoPlay={true}
          autoPlaySpeed={2000}
          className="w-full"
          containerClass="carousel-container"
          itemClass="carousel-item"
          stopOnHover={true}
        >
          {slides.map((slide, index) => (
            <div
              key={index}
              className="flex justify-center items-center transition-transform transform hover:scale-105 pl-5 pr-5 pb-20"
            >
              <div className="bg-white rounded-lg shadow-md p-4 justify-center">
                <img
                  src={slide.image}
                  alt={`${index + 1}`}
                  className="w-14 h-auto rounded-lg mb-4"
                />
                <h3 className="text-xl font-semibold text-gray-800">
                  {slide.title}
                </h3>
                <p className="text-gray-600">{slide.description}</p>
              </div>
            </div>
          ))}
        </Carousel>
      </div>
    </div>
  );
};

export default ImageGallery;
