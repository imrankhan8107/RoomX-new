import React, { useState, useEffect } from "react";

function ProviderList() {
  const [bookings, setbookings] = useState([]);
  const authtoken = localStorage.getItem("authtoken");

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
    <div>
      <h2 className="text-2xl font-bold mb-4 text-gray-700">Room List</h2>
      <table className="table-auto">
        <thead>
          <tr>
            <th className="px-4 py-2">BookingNumber</th>
            <th className="px-4 py-2">Provider Id</th>
            <th className="px-4 py-2">RoomId</th>
            <th className="px-4 py-2">Start Date</th>
            <th className="px-4 py-2">End Date</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((booking, index) => (
            <tr key={booking._id}>
              <td>{index + 1}</td>
              <td className="border px-4 py-2">{booking.provider_id}</td>
              <td className="border px-4 py-2">{booking.roomId}</td>
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
