import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function ProviderList() {
  const [bookings, setbookings] = useState([]);
  const authtoken = localStorage.getItem("authtoken");
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch rooms from the backend
    const fetchProviders = async () => {
      try {
        const response = await fetch(
          "http://localhost:8001/api/admin/getBookings",
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
          console.log(data);
          setbookings(data);
        } else {
          console.error("Fetching booking data failed:", response.statusText);
        }
      } catch (error) {
        console.error("Error during fetching booking data:", error);
      }
    };

    fetchProviders();
  }, [authtoken]);

  return (
    <div className="mx-16">
      <h2 className="text-2xl font-bold mb-4 text-gray-700 mt-4">
        Booking List
      </h2>
      <button
        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        onClick={() => {
          navigate(`/admin/analytics`);
        }}
      >
        Get Analytics
      </button>
      <table className="table-auto my-8">
        <thead>
          <tr>
            <th className="px-4 py-2">BookingNumber</th>
            <th className="px-4 py-2">Provider Name</th>
            <th className="px-4 py-2">Room Name</th>
            <th className="px-4 py-2">Start Date</th>
            <th className="px-4 py-2">End Date</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((booking, index) => (
            <tr key={booking._id}>
              <td className="border px-4 py-2">{index + 1}</td>
              <td className="border px-4 py-2">{booking.provider_name}</td>
              <td className="border px-4 py-2">{booking.room_name}</td>
              <td className="border px-4 py-2">
                {/* {booking.start_date} */}
                {`${new Date(`${booking.start_date}`).toLocaleString()}`}
              </td>
              <td className="border px-4 py-2">
                {/* {booking.end_date} */}
                {`${new Date(`${booking.end_date}`).toLocaleString()}`}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ProviderList;
