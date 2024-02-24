import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
// import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import BookingForm from "../Booking/BookingForm";

function DisplayRooms() {
  const [rooms, setRooms] = useState([]);
  const { provider_id } = useParams();
  const [selectedRoom, setSelectedRoom] = useState(null);

  const handleBookRoom = (room) => {
    console.log(room.room_name);
    console.log(room.provider_id);
    console.log(room.roomId);
    setSelectedRoom(room);
  };

  useEffect(() => {
    const authtoken = localStorage.getItem("authtoken");
    const fetchProviders = async () => {
      try {
        const response = await fetch(
          `http://localhost:8001/api/room/provider/${provider_id}`,
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
          setRooms(data.rooms);
          console.log(data.rooms);
        } else {
          console.error("Fetching Rooms failed:", response.statusText);
        }
      } catch (error) {
        console.error("Error during fetching Rooms:", error);
      }
    };

    fetchProviders();
  }, [provider_id]);

  return (
    <div>
      <h2 className="text-3xl font-bold text-center mb-8 ">Providers</h2>
      <div className="container mx-auto py-8 w-screen flex flex-row ">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {rooms.length > 0 &&
            rooms.map(
              (room) =>
                room.available && (
                  <div key={room._id} className="border rounded-lg p-4">
                    <h3 className="text-xl font-semibold mb-2">
                      {room.room_name}
                    </h3>
                    <p className="mb-2">
                      <div>Capacity: {room.capacity}</div>
                      <div className="mb-4">Available: {room.available}</div>
                      <div className="mb-4">Price: {room.price}</div>
                    </p>
                    <button
                      onClick={() => handleBookRoom(room)}
                      className="bg-blue-500 text-white px-4 py-2 rounded mt-2"
                    >
                      Book Room
                    </button>
                  </div>
                )
            )}
        </div>
        {selectedRoom && <BookingForm selectedRoom={selectedRoom} />}
      </div>
    </div>
  );
}

export default DisplayRooms;
