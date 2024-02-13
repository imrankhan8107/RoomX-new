import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import OrganizationCard from "../../components/Cards/OrganizationCard";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AdminPanel() {
  const [organizations, setOrganizations] = useState([]);
  const authtoken = localStorage.getItem("authtoken");
  const [orgi_name, setName] = useState("");
  const [orgi_email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [email, setUserEmail] = useState("");
  const [searchQuery, setSearchQuery] = useState({
    name: "",
    email: "",
    code: "",
  });
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (authtoken) {
      const toastMessage = localStorage.getItem("toastMessage");
      if (toastMessage) {
        toast.success(toastMessage, {
          autoClose: 5000,
        });

        // Clear the success message from local storage
        localStorage.removeItem("toastMessage");
      }
      getAllOrganization();
    } else {
      // Clear the success message from local storage
      localStorage.removeItem("toastMessage");
      navigate("/login");
    }
  }, [authtoken]);

  const Logout = () => {
    localStorage.clear();
    navigate("/login");
    // window.location.reload();
  };

  const handleSendCodeToEmail = async (org_name, org_email) => {
    try {
      const authtoken = localStorage.getItem("authtoken");
      const response = await fetch(
        "http://localhost:8001/api/admin/sendcodetoemail",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            authtoken: `${authtoken}`,
          },
          body: JSON.stringify({ org_name, org_email }),
          // Make sure org_email is the recipient's email address
        }
      );
      if (response.ok) {
        console.log("Email sent successfully");
      } else {
        console.error("Sending email failed:", response.statusText);
      }
    } catch (error) {
      console.error("Error during email sending:", error);
    }
  };

  const handleRegister = async () => {
    try {
      const response = await fetch(
        "http://localhost:8001/api/admin/createorg",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            authtoken: `${authtoken}`,
          },
          body: JSON.stringify({ orgi_name, orgi_email }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        console.log("Successfully Created");
        alert("Organization created successfully");
        navigate("/admin");
      } else {
        console.error("Registration failed:", response.statusText);
      }
    } catch (error) {
      console.error("Error during Creation:", error);
    }
  };

  const handleDeleteOrganization = async (org_name, org_email, org_code) => {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete the organization "${org_name}"? This will delete all associated users.`
    );

    if (confirmDelete) {
      try {
        // const authtoken = localStorage.getItem('authtoken');
        await fetch("http://localhost:8001/api/admin/deleteorg", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            authtoken: `${authtoken}`,
          },
          body: JSON.stringify({
            org_name,
            org_email,
            org_code,
          }),
        })
          .then((response) => {
            if (response.ok) {
              console.log("Successfully Deleted Organization");
              setOrganizations((prevOrganizations) =>
                prevOrganizations.filter((org) => org.org_code !== org_code)
              );
            } else {
              console.error(
                "Organization deletion failed:",
                response.statusText
              );
            }
          })
          .catch((error) => {
            console.error("Error during organization deletion:", error);
          });
      } catch (error) {
        console.error("Error during organization deletion:", error);
      }
    }
  };

  const getAllOrganization = async () => {
    try {
      const authtoken = localStorage.getItem("authtoken");
      const response = await fetch(
        "http://localhost:8001/api/admin/getallorgs",
        {
          method: "GET",
          headers: {
            "Content-type": "application/json",
            authtoken: `${authtoken}`,
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        setOrganizations(data.orgs);
      } else {
        console.error("Fetching organizations failed:", response.statusText);
      }
    } catch (error) {
      console.error("Error during fetching organizations:", error);
    }
  };

  const handleSearchInputChange = (event, field) => {
    setSearchQuery((prevSearch) => ({
      ...prevSearch,
      [field]: event.target.value,
    }));
  };

  const toggleSearch = () => {
    setIsSearchExpanded((prev) => !prev);
  };

  // const filteredOrganizations = organizations.filter((org) =>
  //   org.org_name.toLowerCase().startsWith(searchQuery.name.toLowerCase()) &&
  //   org.org_email.toLowerCase().startsWith(searchQuery.email.toLowerCase()) &&
  //   org.org_code.toString().startsWith(searchQuery.code)
  // );

  return (
    <div className="bg-gray-100 min-h-screen p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-blue-500">Admin Panel</h1>
        <div>
          <Link to="/admin/addroom">
            <button className="bg-blue-500 text-white py-2 px-4 rounded ml-20">
              Room Section
            </button>
          </Link>
          <Link to="/admin/addproviders">
            <button className="bg-blue-500 text-white py-2 px-4 rounded ml-20">
              Provider Section
            </button>
          </Link>
        </div>
        <button
          onClick={Logout}
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        >
          Logout
        </button>
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4 text-gray-700">
          Register Organization
        </h2>
        <div className="flex flex-col md:flex-row items-center gap-4">
          <input
            type="text"
            placeholder="Username"
            value={orgi_name}
            onChange={(e) => setName(e.target.value)}
            className="w-full md:w-1/4 p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="email"
            placeholder="Email"
            value={orgi_email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full md:w-1/4 p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleRegister}
            className="w-full md:w-auto bg-blue-500 text-white py-3 px-6 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            Register
          </button>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-4 text-gray-700">
          Registered Organizations
        </h2>
        <div className="flex items-center gap-4">
          <button
            onClick={getAllOrganization}
            className="bg-blue-500 text-white py-3 px-6 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            Get All Organization
          </button>
          <div className="relative flex flex-col items-center ml-4">
            {isSearchExpanded && (
              <>
                <input
                  type="text"
                  placeholder="Search by name"
                  value={searchQuery.name}
                  onChange={(e) => handleSearchInputChange(e, "name")}
                  className="p-3 mb-2 md:mb-0 md:mr-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="text"
                  placeholder="Search by email"
                  value={searchQuery.email}
                  onChange={(e) => handleSearchInputChange(e, "email")}
                  className="p-3 mb-2 md:mb-0 md:mr-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="text"
                  placeholder="Search by code"
                  value={searchQuery.code}
                  onChange={(e) => handleSearchInputChange(e, "code")}
                  className="p-3 mb-2 md:mb-0 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </>
            )}
            <div
              className={`cursor-pointer ml-${isSearchExpanded ? "2" : "1"}`}
              onClick={toggleSearch}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6 text-gray-500"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                />
              </svg>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {organizations.map((org, index) => (
            <OrganizationCard
              key={index}
              org={org}
              handleSendCodeToEmail={handleSendCodeToEmail}
              handleDeleteOrganization={handleDeleteOrganization}
            />
          ))}
        </div>
      </div>

      <ToastContainer autoClose={3000} />
    </div>
  );
}

export default AdminPanel;
