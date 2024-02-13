import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Login() {
  const [fadeIn, setFadeIn] = useState(false);

  useEffect(() => {
    // Trigger the fade-in animation when the component mounts
    setFadeIn(true);
  }, []);

  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // Special handling for the 'username' field to trim only during form submission
    const trimmedValue = name === "username" ? value : value.trim();
    
    setFormData({
      ...formData,
      [name]: trimmedValue,
    });
  };

  const showValidationError = (message) => {
    toast.error(message, { position: toast.POSITION.TOP_CENTER });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { username, password } = formData;

    try {
      const response = await fetch('http://localhost:8001/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const data = await response.json();

        const toastMessage = `Welcome back ${data.username}, glad to see you again`;

        if (data.userType === "user") {
          const authtoken = data.authtoken;
          localStorage.setItem('authtoken', authtoken);
          localStorage.setItem('toastMessage', toastMessage);
          // login();
          window.location.href = '/room';
        }
        if (data.userType === "admin") {
          const authtoken = data.authtoken;
          localStorage.setItem('authtoken', authtoken);
          localStorage.setItem('toastMessage', toastMessage);
          window.location.href = '/admin';
        }
      } else {
        const contentType = response.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
          const data = await response.json();
          if (data.error) {
            showValidationError(data.error);
          }
        } else {
          console.error('Login failed:', response.statusText);
        }
      }
    } catch (error) {
      console.error('Error during login:', error);
      // Logger.error('Error during login:', error);
    }
  };

  return (
    <>
      <div className={`opacity-0 ${fadeIn ? 'opacity-100 transition-opacity duration-1000' : ''} ${fadeIn ? 'transform translate-y-0' : 'transform translate-y-[-50px] transition-transform duration-1000'}`}>
  {/* <div className="md:hidden">
    <img src={registerImg} alt="register" className="w-full h-auto" />
  </div> */}
  <div className={`flex flex-row`}>
    <div className='hidden md:block md:flex-1 mt-8'> {/* Adjusted margin here */}
      <img src="./Images/register.webp" alt="register" className="w-full h-auto" />
    </div>
    <div className="flex-1 w-full p-6 bg-white min-h-screen flex flex-col items-center justify-center">
      <h2 className="text-3xl font-bold text-gray-800 mb-10">Welcome back</h2>
      <form onSubmit={handleSubmit} className="w-full max-w-md">
            <div className="mb-6">
              <label htmlFor="username" className="block text-gray-700 font-semibold mb-2 text-left">
                Username
              </label>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:ring-orange-200 transition duration-300"
                required
              />
            </div>
            <div className="mb-6">
              <label htmlFor="password" className="block text-gray-700 font-semibold mb-2 text-left">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:ring-orange-200 transition duration-300"
                required
              />
              <Link to='/sendmail'>
                <p className='text-blue-400 text-right'>Forgot Password?</p>
              </Link>
            </div>
            <div className="text-center">
              <button
                type="submit"
                className="w-full p-3 rounded-md bg-gradient-to-r from-orange-500 to-yellow-500 text-white hover:from-yellow-600 hover:to-orange-600 focus:outline-none transition duration-300"
              >
                Log In
              </button>
              <Link to='/register' className='text-md text-gray-600 block mt-3 text-center'>
                New member? Register
              </Link>
            </div>
          </form>
        </div>
      </div>
        </div>
      <ToastContainer autoClose={3000} />

    </>
  );
}

export default Login;