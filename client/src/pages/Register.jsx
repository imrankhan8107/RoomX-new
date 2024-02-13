import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { Eye, EyeOff } from "react-feather";
import "react-toastify/dist/ReactToastify.css";


const Register = () => {
  const [fadeIn, setFadeIn] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    contact: "",
    password: "",
    org_code: "",
  });
  const [validationErrors, setValidationErrors] = useState({});
  const [registrationError, setRegistrationError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    setFadeIn(true);
  }, []);

  const [termsChecked, setTermsChecked] = useState(false);
  const [checkboxError, setCheckboxError] = useState("");

  const handleTermsChange = () => {
    setTermsChecked(!termsChecked);
    setCheckboxError("");
  };

  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // Special handling for the 'username' field to trim only during form submission
    const trimmedValue = name === "username" ? value : value.trim();
  
    setFormData({
      ...formData,
      [name]: trimmedValue,
    });
  
    setValidationErrors({
      ...validationErrors,
      [name]: "",
    });
  };
  

  const showRegistrationError = (error) => {
    toast.error(error, { position: toast.POSITION.TOP_CENTER });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Trim leading and trailing spaces from the 'name' field
    const trimmedName = formData.username.trim();

    // Update the form data with the trimmed name
    setFormData({
      ...formData,
      username: trimmedName,
    });

    if (!termsChecked) {
      setCheckboxError("Please accept the Terms and Conditions.");
      return;
    }

    setValidationErrors({});
    setRegistrationError("");

    toast.info("Registration is in process. Please wait...", {
      autoClose: false,
    });

    try {
      const response = await fetch(
        'http://localhost:8001/api/auth/createuser', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();

        const token = data.token;
        localStorage.setItem("token", token);

        toast.dismiss();

        toast.success("Registration is successful. You may now check your mail for further instructions", {
          autoClose: 6000,
        });

        setTimeout(() => {
          navigate("/login");
        }, 3000);
      } else {
        toast.dismiss();
        const contentType = response.headers.get("content-type");
        if (contentType && contentType.includes("application/json")) {
          const data = await response.json();
          console.error("Registration failed:", data);

          if (data.errors) {
            const errors = data.errors;

            const newValidationErrors = {};

            errors.forEach((error) => {
              const { path, msg } = error;
              newValidationErrors[path] = msg;
              showRegistrationError(`${path}: ${msg}`);
            });

            setValidationErrors(newValidationErrors);
          }

          if (data.error) {
            const newValidationErrors = {};

            setRegistrationError(data.error);
            showRegistrationError(data.error);
          }
        } else {
          console.error("Registration failed with non-JSON response");
        }
      }
    } catch (error) {
      console.error("Error during registration:", error);
      // errorLogger.error(`Error in registerUser: ${error.message}`);
    }
  };

  return (
    <>
      <div className={`flex flex-col-reverse md:flex-row opacity-0 ${fadeIn ? 'opacity-100 transition-opacity duration-1000' : ''} ${fadeIn ? 'transform translate-y-0' : 'transform translate-y-[-50px] transition-transform duration-1000'}`}>
        <div className="hidden md:block md:flex-1 mt-20">
          <img src="./Images/register.webp" alt="register" className="w-full h-auto" />
        </div>
        <div className="flex-1 w-full p-6 bg-white min-h-screen flex flex-col items-center justify-center">
          <h2 className="text-3xl font-bold mb-6">Welcome</h2>
          <form onSubmit={handleSubmit} className="w-full max-w-md">
            <div className="mb-6">
              <label htmlFor="username" className="block text-gray-700 font-semibold mb-1 text-left">
                Name *
              </label>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:ring-orange-200 transition duration-300"
              />
            </div>

            <div className="mb-6">
              <label htmlFor="email" className="block text-gray-700 font-semibold mb-1 text-left">
                Email *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:ring-orange-200 transition duration-300"
              />
            </div>

            <div className="mb-6">
              <label htmlFor="contact" className="block text-gray-700 font-semibold mb-1 text-left">
                Contact *
              </label>
              <input 
                type="number"
                id="contact"
                name="contact"
                value={formData.contact}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:ring-orange-200 transition duration-300"
              />
            </div>

            <div className="mb-6 relative">
              <label htmlFor="password" className="block text-gray-700 font-semibold mb-1 text-left">
                Password *
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border rounded-md shadow-sm pr-10 focus:outline-none focus:ring focus:ring-orange-200 transition duration-300"
                />
                <button
                  type="button"
                  onClick={handleTogglePassword}
                  className="absolute top-2 right-2 h-8 w-8 flex items-center justify-center text-gray-600"
                >
                  {showPassword ? <EyeOff /> : <Eye />}
                </button>
              </div>
            </div>

            <div className="mb-6">
              <label htmlFor="org_code" className="block text-gray-700 font-semibold mb-1 text-left">
                Organization Code *
              </label>
              <input
                type="text"
                id="org_code"
                name="org_code"
                value={formData.org_code}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:ring-orange-200 transition duration-300"
              />
            </div>

            <div className="mb-6">
              <label htmlFor="terms" className="flex items-center text-gray-700 font-semibold mb-1 text-left">
                <input
                  type="checkbox"
                  id="terms"
                  name="terms"
                  checked={termsChecked}
                  onChange={handleTermsChange}
                  className="mr-2"
                />
                I accept the{' '}
                <a
                  href="/about/termsandconditions"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 cursor-pointer"
                >
                  Terms and Conditions
                </a>
              </label>
              {checkboxError && (
                <p className="text-red-500 mt-2">{checkboxError}</p>
              )}
            </div>

            <div className="mb-6">
              <button
                type="submit"
                className="w-full p-3 rounded-md bg-gradient-to-r from-orange-500 to-yellow-500 text-white hover:from-yellow-600 hover:to-orange-600 focus:outline-none transition duration-300"
              >
                Register
              </button>
              <Link to="/login" className="text-md text-gray-600 block mt-3 text-center">
                Already a member? Login
              </Link>
            </div>
          </form>

        </div>
      </div>
      <ToastContainer autoClose={3000} />
    </>
  );
};

export default Register;