import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { Link as ScrollLink, animateScroll as scroll } from "react-scroll";

function Navbar() {
  const authtoken = localStorage.getItem("authtoken");

  const [isLoggedin, setIsLoggedin] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigate = useNavigate(); // Access the history object for navigation
  const location = useLocation();

  useEffect(() => {
    if (authtoken) {
      setIsLoggedin(true);
    }
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const Logout = () => {
    localStorage.clear();
    window.location.reload();
    setIsLoggedin(false);
    setIsMobileMenuOpen(false);
  };

  const scrollToTop = () => {
    scroll.scrollToTop();
    setIsMobileMenuOpen(false);
  };

  const scrollToContact = () => {
    navigate("/"); // Navigate to the homepage
    // Delay the scroll to ensure it happens after the redirect
    setTimeout(() => {
      scroll.scrollTo("getintouch", {
        duration: 800, // You can adjust the duration as needed
        smooth: "easeInOutQuart", // You can adjust the scrolling effect
        offset: -100, // You can adjust the scroll offset
      });
    }, 1000); // Adjust the delay time as needed
  };

  return (
    <nav className={`bg-white p-3 top-0 left-0 right-0 z-50 sticky`}>
      <div className="container mx-auto flex justify-between items-center">
        <div className="md:hidden mx-3">
          <button className="text-2xl items-end" onClick={toggleMobileMenu}>
            ☰
          </button>
        </div>
        <a href="/" onClick={scrollToTop}>
          {/* <img src={logoImage} alt="Logo" width="150px" height="50px" /> */}
        </a>
        <div className="space-x-4 hidden md:flex">
          <Link
            to="/"
            className="nav-link px-2 hover:bg-gradient-to-r from-orange-500 to-yellow-500 hover:text-white transition duration-300 py-1"
          >
            Home
          </Link>
          <Link
            to="/about"
            className="nav-link px-2 hover:bg-gradient-to-r from-orange-500 to-yellow-500 hover:text-white transition duration-300 py-1"
          >
            About Us
          </Link>
          <a
            href="/ContactUs"
            className="nav-link block px-2 hover:bg-gradient-to-r from-orange-500 to-yellow-500 hover:text-white transition duration-300 py-1"
          >
            Contact Us
          </a>

          <Link to={isLoggedin ? "/" : "/login"}>
            <button
              className="font-bold bg-gradient-to-r from-orange-500 to-yellow-500 rounded-full py-1 px-2"
              onClick={isLoggedin ? Logout : null}
            >
              {isLoggedin ? "Logout" : "Login"}
            </button>
          </Link>
          {!isLoggedin && (
            <a
              href="/register"
              className="font-bold bg-gradient-to-r from-orange-500 to-yellow-500 rounded-full py-1 px-2"
            >
              Sign up
            </a>
          )}
        </div>
        <div className="md:hidden mx-1">
          <Link to={isLoggedin ? "/" : "/login"} onClick={scrollToTop}>
            <button
              className="font-bold bg-gradient-to-r from-orange-500 to-yellow-500 rounded-full py-1 px-2 hover:text-white hover:bg-gray-300"
              onClick={isLoggedin ? Logout : null}
            >
              {isLoggedin ? "Logout" : "Login"}
            </button>
          </Link>
        </div>
      </div>
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden bg-gray-200 bg-opacity-75 transition-opacity duration-300">
          <div className="fixed inset-y-0 left-0 w-64 bg-black bg-opacity-75 p-4 overflow-y-auto transform translate-x-0 md:translate-x-0 transition-transform duration-300">
            <div className="flex justify-end mb-2">
              <button
                className="text-2xl text-white"
                onClick={toggleMobileMenu}
              >
                ✕
              </button>
            </div>
            <Link
              to="/"
              onClick={scrollToTop}
              className="nav-link block py-2 hover:text-black hover:bg-gray-300 text-white"
            >
              Home
            </Link>
            <Link
              to="/about"
              onClick={scrollToTop}
              className="nav-link block py-2 hover:text-black hover:bg-gray-300 mb-2 text-white"
            >
              About Us
            </Link>
            <a
              href="/ContactUs"
              className="nav-link block px-2 hover:text-black hover:bg-gray-300 transition duration-300 py-1 mb-2 text-white"
            >
              Contact Us
            </a>

            {!isLoggedin && (
              <a
                href="/register"
                onClick={scrollToTop}
                className="font-bold bg-gradient-to-r from-orange-500 to-yellow-500 rounded-full py-1 px-2 hover:text-black hover:bg-gray-300 mb-2"
              >
                Sign up
              </a>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
