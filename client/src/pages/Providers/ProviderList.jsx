import React, { useState, useEffect } from "react";

function ProviderList() {
  const [providers, setproviders] = useState([]);
  const authtoken = localStorage.getItem("authtoken");

  useEffect(() => {
    // Fetch rooms from the backend
    const fetchProviders = async () => {
      try {
        const response = await fetch(
          "http://localhost:8001/api/admin/getAllProviders",
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
          setproviders(data.providers);
        } else {
          console.error("Fetching rooms failed:", response.statusText);
        }
      } catch (error) {
        console.error("Error during fetching providers:", error);
      }
    };

    fetchProviders();
  }, [authtoken]);

  const handleDeleteRoom = async (roomId) => {
    // Implement the delete room functionality
    try {
      const response = await fetch(
        `http://localhost:8001/api/admin/deleteroom/${roomId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            authtoken: `${authtoken}`,
          },
        }
      );

      if (response.ok) {
        // Remove the deleted room from the state
        setproviders((prevProviders) =>
          prevProviders.filter((room) => room._id !== roomId)
        );
        console.log("Provider deleted successfully");
      } else {
        console.error("Provider deletion failed:", response.statusText);
      }
    } catch (error) {
      console.error("Error during room deletion:", error);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4 text-gray-700">Room List</h2>
      <table className="table-auto">
        <thead>
          <tr>
            <th className="px-4 py-2">Provider Name</th>
            <th className="px-4 py-2">Email</th>
            <th className="px-4 py-2">Location</th>
            <th className="px-4 py-2">Rating</th>
            <th className="px-4 py-2">code</th>
          </tr>
        </thead>
        <tbody>
          {providers.map((provider) => (
            <tr key={provider._id}>
              <td className="border px-4 py-2">{provider.provider_name}</td>
              <td className="border px-4 py-2">{provider.provider_email}</td>
              <td className="border px-4 py-2">{provider.provider_address}</td>
              <td className="border px-4 py-2">{provider.provider_rating}</td>
              <td className="border px-4 py-2">{provider.provider_code}</td>
              <td className="border px-4 py-2">
                <button
                  onClick={() => handleDeleteRoom(provider._id)}
                  className="text-red-500"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ProviderList;
