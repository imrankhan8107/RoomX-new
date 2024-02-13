import React, { useState } from "react";
import { Link } from "react-router-dom";
function AddProviders() {
  const [providerData, setproviderData] = useState({
    provider_name: "",
    location: "",
    rooms: [],
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setproviderData((prevData) => ({
      ...prevData,
      [name]:
        name === "capacity" || name === "price" ? parseInt(value, 10) : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const authtoken = localStorage.getItem("authtoken");
      const response = await fetch(
        "http://localhost:8001/api/admin/addprovider",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            authtoken: `${authtoken}`,
          },
          body: JSON.stringify(providerData),
        }
      );

      if (response.ok) {
        alert("Added successfully");
        console.log("Provider added successfully");
      } else {
        console.error("Provider addition failed:", response.statusText);
      }
    } catch (error) {
      console.error("Error during provider addition:", error);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Add Provider</h1>
      </div>

      <form
        onSubmit={handleSubmit}
        className="max-w-md mx-auto bg-white p-8 shadow-md rounded-md"
      >
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="provider_name"
          >
            Provider Name:
          </label>
          <input
            type="text"
            id="provider_name"
            name="provider_name"
            value={providerData.provider_name}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
          />
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="provider_address"
          >
            Location:
          </label>
          <input
            type="text"
            id="provider_address"
            name="provider_address"
            value={providerData.provider_address}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
          />
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="provider_email"
          >
            Email:
          </label>
          <input
            type="text"
            id="provider_email"
            name="provider_email"
            value={providerData.provider_email}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
          />
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="provider_code"
          >
            Code :
          </label>
          <input
            type="text"
            id="provider_code"
            name="provider_code"
            value={providerData.provider_code}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
          />
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="provider_phone"
          >
            Phone:
          </label>
          <input
            type="text"
            id="provider_phone"
            name="provider_phone"
            value={providerData.provider_phone}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="provider_description"
          >
            Description:
          </label>
          <input
            type="text"
            id="provider_description"
            name="provider_description"
            value={providerData.provider_description}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="provider_rating"
          >
            Rating:
          </label>
          <input
            type="text"
            id="provider_rating"
            name="provider_rating"
            value={providerData.provider_rating}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="provider_reviews"
          >
            Review:
          </label>
          <input
            type="text"
            id="provider_reviews"
            name="provider_reviews"
            value={providerData.provider_reviews}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="provider_rooms"
          >
            Room:
          </label>
          <input
            type="text"
            id="provider_rooms"
            name="provider_rooms"
            value={providerData.provider_rooms}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 mr-10"
        >
          Add Room
        </button>

        <Link to="/admin/getproviders">
          <button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
            View ProviderList
          </button>
        </Link>
      </form>
    </div>
  );
}

export default AddProviders;
