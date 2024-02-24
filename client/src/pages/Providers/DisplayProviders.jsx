import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
// import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function DisplayProviders() {
  const [providers, setProviders] = useState([]);

  useEffect(() => {
    const authtoken = localStorage.getItem("authtoken");
    const fetchProviders = async () => {
      try {
        const response = await fetch(
          "http://localhost:8001/api/room/getAllProviders",
          {
            method: "GET",
            headers: {
              authtoken: authtoken,
              "Content-type": "application/json",
            },
          }
        );

        if (response.ok) {
          const data = await response.json();
          setProviders(data.providers);
          console.log(data.providers);
        } else {
          console.error("Fetching providers failed:", response.statusText);
        }
      } catch (error) {
        console.error("Error during fetching providers:", error);
      }
    };

    fetchProviders();
  }, []);

  return (
    <div className="container mx-auto py-8">
      <h2 className="text-3xl font-bold text-center mb-8">Providers</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {providers.map((provider) => (
          <Link to={`/provider/${provider._id}`}>
            <div key={provider._id} className="border rounded-lg p-4">
              <h3 className="text-xl font-semibold mb-2">
                {provider.provider_name}
              </h3>
              <p className="mb-2">
                <div>Description: {provider.provider_description}</div>
                <div className="mb-4">Ratings: {provider.provider_rating}</div>
              </p>
              <p className="text-gray-600">{provider.provider_address}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default DisplayProviders;
