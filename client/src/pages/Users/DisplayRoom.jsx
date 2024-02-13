import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import BookingForm from "../Booking/BookingForm";

function DisplayRoom() {
  const [rooms, setRooms] = useState([]);
  const [filteredRooms, setFilteredRooms] = useState([]);
  const [filters, setFilters] = useState({
    price: "",
    capacity: "",
    location: ""
  });
  const [selectedRoom, setSelectedRoom] = useState(null);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await fetch('http://localhost:8001/api/room/getallrooms', {
          method: "GET",
          headers: {
            "Content-type": "application/json",
          },
        });

        if (response.ok) {
          const data = await response.json();
          setRooms(data.rooms);
          setFilteredRooms(data.rooms);
        } else {
          console.error("Fetching rooms failed:", response.statusText);
        }
      } catch (error) {
        console.error("Error during fetching rooms:", error);
      }
    };

    fetchRooms();
  }, []);

  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    setFilters(prevFilters => ({
      ...prevFilters,
      [name]: value
    }));
  };

  useEffect(() => {
    const filterRooms = () => {
      let filtered = rooms.filter(room => {
        if (filters.price && room.price !== parseInt(filters.price)) {
          return false;
        }
        if (filters.capacity && room.capacity !== parseInt(filters.capacity)) {
          return false;
        }
        if (filters.location && !room.location.includes(filters.location)) {
          return false;
        }
        return true;
      });
      setFilteredRooms(filtered);
    };

    filterRooms();
  }, [rooms, filters]);

  const handleBookRoom = (room) => {
    setSelectedRoom(room);
  };

  return (
    <div className="flex">
      <div className="w-1/4 p-4">
        <h2 className="text-2xl font-bold mb-4 text-gray-700">Filters</h2>
        <div className="mb-4">
          <label className="block mb-2">Price:</label>
          <input type="text" name="price" value={filters.price} onChange={handleFilterChange} className="border p-2 rounded-md w-full" />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Capacity:</label>
          <input type="text" name="capacity" value={filters.capacity} onChange={handleFilterChange} className="border p-2 rounded-md w-full" />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Location:</label>
          <input type="text" name="location" value={filters.location} onChange={handleFilterChange} className="border p-2 rounded-md w-full" />
        </div>
      </div>
      <div className="w-3/4 p-4 grid grid-cols-2 gap-4">
        {filteredRooms.map((room) => (
          <div key={room._id} className="border rounded-lg p-4">
            <h3 className="text-xl font-semibold">{room.room_name}</h3>
            <p>Capacity: {room.capacity}</p>
            <p>Location: {room.location}</p>
            <p>Price: {room.price}</p>
            <button onClick={() => handleBookRoom(room)} className="bg-blue-500 text-white px-4 py-2 rounded mt-2">Book Room</button>
          </div>
        ))}
      </div>
      {selectedRoom && (
        <BookingForm
          selectedRoom={selectedRoom}
        />
      )}
    </div>
  );
}

export default DisplayRoom;
