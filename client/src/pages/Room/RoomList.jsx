import React, { useState, useEffect } from "react";

function RoomList() {
  const [rooms, setRooms] = useState([]);
  const authtoken = localStorage.getItem("authtoken");

  useEffect(() => {
    // Fetch rooms from the backend
    const fetchRooms = async () => {
      try {
        const response = await fetch(
          "http://localhost:8001/api/admin/getallrooms",
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
          setRooms(data.rooms);
        } else {
          console.error("Fetching rooms failed:", response.statusText);
        }
      } catch (error) {
        console.error("Error during fetching rooms:", error);
      }
    };

    fetchRooms();
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
        setRooms((prevRooms) =>
          prevRooms.filter((room) => room._id !== roomId)
        );
        console.log("Room deleted successfully");
      } else {
        console.error("Room deletion failed:", response.statusText);
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
            <th className="px-4 py-2">Room Name</th>
            <th className="px-4 py-2">Capacity</th>
            <th className="px-4 py-2">Location</th>
            <th className="px-4 py-2">Price</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {rooms.map((room) => (
            <tr key={room._id}>
              <td className="border px-4 py-2">{room.room_name}</td>
              <td className="border px-4 py-2">{room.capacity}</td>
              <td className="border px-4 py-2">{room.location}</td>
              <td className="border px-4 py-2">{room.price}</td>
              <td className="border px-4 py-2">
                <button
                  onClick={() => handleDeleteRoom(room._id)}
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

export default RoomList;
