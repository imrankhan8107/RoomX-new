import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import BookingForm from "../Booking/BookingForm";

function DisplayRooms() {
  const [rooms, setRooms] = useState([]);
  const { provider_id } = useParams();
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [showBookingForm, setShowBookingForm] = useState(false);

  const handleBookRoom = (room) => {
    setSelectedRoom(room);
    setShowBookingForm(true);
  };

  const handleCloseBookingForm = () => {
    setSelectedRoom(null);
    setShowBookingForm(false);
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
      <h2 className="text-3xl font-bold text-center mb-8 ">Rooms</h2>
      <div className="container mx-auto py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {rooms.length > 0 &&
            rooms.map(
              (room) =>
                room.available && (
                  <div
                    key={room._id}
                    className="flex justify-center items-center"
                  >
                    <div className="max-w-xs w-full rounded-lg overflow-hidden shadow-lg">
                      <div className="px-6 py-4">
                        <div className="font-bold text-xl mb-2">
                          {room.room_name}
                        </div>
                        <p className="text-gray-700 text-base">
                          Capacity: {room.capacity}
                        </p>
                        <p className="text-gray-700 text-base">
                          Price: {room.price}
                        </p>
                        <p className="text-gray-700 text-base">
                          Accessories: {room.accessories.join(", ")}
                        </p>s
                      </div>
                      <div className="px-6 py-4">
                        <button
                          onClick={() => handleBookRoom(room)}
                          className="bg-blue-500 text-white px-4 py-2 rounded-full mt-2 w-full"
                        >
                          Book Room
                        </button>
                      </div>
                    </div>
                  </div>
                )
            )}
        </div>
      </div>
      {showBookingForm && (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <button
              onClick={handleCloseBookingForm}
              className="absolute top-0 right-0 m-4 text-gray-600 hover:text-gray-800"
            >
              X
            </button>
            <BookingForm selectedRoom={selectedRoom} />
          </div>
        </div>
      )}
    </div>
  );
}

export default DisplayRooms;
