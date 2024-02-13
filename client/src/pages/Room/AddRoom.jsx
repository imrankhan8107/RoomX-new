import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
function AddRoom() {
  const [roomData, setRoomData] = useState({
    room_name: "",
    capacity: 0,
    price: 0,
    provider_id: "",
  });
  const [providerList, setproviderList] = useState({});

  useEffect(() => {
    const fetchProviders = async () => {
      try {
        const authtoken = localStorage.getItem("authtoken");
        const response = await fetch(
          "http://localhost:8001/api/admin/getProviderList",
          {
            method: "GET",
            headers: {
              "Content-type": "application/json",
              authtoken: `${authtoken}`,
            },
          }
        );
        if (response.ok) {
          const providerData = await response.json();
          console.log(providerData);
          setproviderList(providerData.data);
        } else {
          console.error("Unable to fetch providers list");
        }
      } catch (error) {
        console.error("Error fetching providers list:", error);
      }
    };
    fetchProviders();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value, typeof value);
    setRoomData((prevData) => ({
      ...prevData,
      [name]:
        name === "capacity" || name === "price" ? parseInt(value, 10) : value,
    }));
  };

  // TODO: localhost:8001/api/admin/getProviderList  =?get the providers List
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const authtoken = localStorage.getItem("authtoken");
      console.log(roomData);
      const response = await fetch("http://localhost:8001/api/admin/addroom", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authtoken: `${authtoken}`,
        },
        body: JSON.stringify(roomData),
      });

      if (response.ok) {
        console.log("Room added successfully");
        alert("Added successfully");
      } else {
        console.error("Room addition failed:", response.statusText);
      }
    } catch (error) {
      console.error("Error during room addition:", error);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Add Room</h1>
      </div>

      <form
        onSubmit={handleSubmit}
        className="max-w-md mx-auto bg-white p-8 shadow-md rounded-md"
      >
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="room_name"
          >
            Room Name:
          </label>
          <input
            type="text"
            id="room_name"
            name="room_name"
            value={roomData.room_name}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
          />
        </div>

        {/* <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="location"
          >
            Location:
          </label>
          <input
            type="text"
            id="location"
            name="location"
            value={roomData.location}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
          />
        </div> */}

        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="capacity"
          >
            Capacity:
          </label>
          <input
            type="number"
            id="capacity"
            name="capacity"
            value={roomData.capacity}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
            min={0}
          />
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="price"
          >
            Price:
          </label>
          <input
            type="number"
            id="price"
            name="price"
            value={roomData.price}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
            min={0}
          />
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="provider_id"
          >
            Provider:
          </label>
          <select
            id="provider_id"
            name="provider_id"
            value={roomData.provider_id}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
          >
            <option value="">Select Provider</option>
            {providerList &&
              providerList.length > 0 &&
              Array.isArray(providerList) &&
              providerList.map((provider) => (
                <option key={provider.provider_id} value={provider.provider_id}>
                  {provider.provider_name}
                </option>
              ))}
          </select>
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 mr-10"
        >
          Add Room
        </button>

        <Link to="/admin/getrooms">
          <button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
            View RoomList
          </button>
        </Link>
      </form>
    </div>
  );
}

export default AddRoom;
