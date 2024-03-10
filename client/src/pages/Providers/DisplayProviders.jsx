import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function DisplayProviders() {
  const [providers, setProviders] = useState([]);
  const [filteredProviders, setFilteredProviders] = useState([]);
  const [locationFilter, setLocationFilter] = useState("");

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
          setFilteredProviders(data.providers);
        } else {
          console.error("Fetching providers failed:", response.statusText);
        }
      } catch (error) {
        console.error("Error during fetching providers:", error);
      }
    };

    fetchProviders();
  }, []);

  const handleLocationFilterChange = (e) => {
    const filter = e.target.value;
    setLocationFilter(filter);
    const filtered = providers.filter((provider) =>
      provider.provider_address.includes(filter)
    );
    setFilteredProviders(filtered);
  };

  return (
    <div className="container mx-auto py-8">
      <h2 className="text-3xl font-bold text-center mb-8">Providers</h2>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Filter by Location"
          value={locationFilter}
          onChange={handleLocationFilterChange}
          className="border rounded-md px-4 py-2 w-full max-w-md mx-auto"
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredProviders.map((provider) => (
          <Link to={`/provider/${provider._id}`} key={provider._id}>
            <div className="border rounded-lg p-4 hover:bg-gray-100 transition duration-300">
              <h3 className="text-xl font-semibold mb-2">{provider.provider_name}</h3>
              <p className="mb-2">
                <span className="text-gray-700 font-semibold">Description: {provider.provider_description}</span>
                <br />
                <span className="text-gray-700 mb-4 font-semibold">Ratings: {provider.provider_rating}</span>
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
