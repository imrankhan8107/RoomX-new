import React, { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import ImageGallery from "../components/Homepage/ImageGallery";
import GetInTouch from "../components/Homepage/GetInTouch";
import homeImg from "./Images/homeimg.png";

const Home = () => {
  const navigate = useNavigate();
  const authtoken = localStorage.getItem("authtoken");
  const handleClick = useCallback(() => {
    if (authtoken) {
      navigate("/provider");
    } else {
      navigate("/login");
    }
  }, [authtoken, navigate]);
  // useEffect(() => {
  //   handleClick();
  // }, [authtoken, handleClick]);
  return (
    <div>
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-center">
        <div className="md:w-1/2 p-4">
          <h2 className="text-3xl font-bold">BOOK A ROOM</h2>
          <h2 className="text-3xl font-bold">SEAL YOUR SPACE</h2>
          <p className="mt-2 text-xl">
            Secure your space with our seamless room booking system
          </p>
          <button
            className="bg-pink-300 px-4 py-2 text-white mt-4 rounded-md"
            onClick={handleClick}
          >
            BOOK A ROOM
          </button>
        </div>

        <div className="md:w-1/3">
          {/* <img
            src="./Images/homeimg.png"
            alt={"Image"}
            className="object-cover w-full h-full"
          /> */}
          <img src={homeImg} alt={"pics"} />
        </div>
      </div>
      <div className="mx-auto flex flex-col items-center justify-center mt-10">
        <h2 className="text-2xl font-semibold md:text-5xl">
          Swift Spaces, Instant graces:
        </h2>
        <h2 className="text-2xl font-semibold mt-4 md:text-5xl">
          Elevate meetings in real-time!
        </h2>
        <p className="mt-8 md:text-xl">
          Experience the fastest, most scalable and versatile
        </p>
        <p className="mt-2 md:text-xl">
          meeting room booking system for your team and business
        </p>
      </div>

      <ImageGallery />
      <GetInTouch />
    </div>
  );
};

export default Home;
