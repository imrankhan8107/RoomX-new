import React, { useState } from "react";
import { toast } from "react-toastify";

const BookingForm = ({ selectedRoom }) => {
  const [selectedStartDate, setSelectedStartDate] = useState("");
  const [selectedEndDate, setSelectedEndDate] = useState("");
  const [selectedStartTime, setSelectedStartTime] = useState("");
  const [selectedEndTime, setSelectedEndTime] = useState("");

  const getUserId = async (authtoken) => {
    try {
      const decodedToken = atob(authtoken.split(".")[1]);
      const userData = await JSON.parse(decodedToken);
      // console.log(userData);
      // console.log(typeof userData.user.userId, typeof selectedRoom._id);
      return userData.user.userId;
    } catch (error) {
      console.error("Error decoding authToken:", error);
      return null;
    }
  };

  const handleBookingSubmit = async () => {
    try {
      const authtoken = localStorage.getItem("authtoken");
      const userId = await getUserId(authtoken);
      const bookingData = {
        roomId: selectedRoom._id,
        users: userId,
        provider_id: selectedRoom.provider_id,
        startDate: `${selectedStartDate} ${selectedStartTime}`,
        endDate: `${selectedEndDate} ${selectedEndTime}`,
        startTime: `${selectedStartDate} ${selectedStartTime}`,
        endTime: `${selectedEndDate} ${selectedEndTime}`,
      };

      // console.log(bookingData);

      const response = await fetch("http://localhost:8001/api/room/booking", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authtoken: `${authtoken}`,
        },
        body: JSON.stringify(bookingData),
      });

      if (response.ok) {
        toast.success(
          "Booking successful! You will receive a confirmation email shortly."
        );
      } else {
        const data = await response.json();

        toast.error(data.error || "Booking failed. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting booking:", error);
      toast.error("Booking failed. Please try again.");
    }
  };

  return (
    <div className="flex justify-center items-center">
      <div className="w-full max-w-md p-4">
        <h2 className="text-2xl font-bold mb-4 text-gray-700">Booking Form</h2>
        <form onSubmit={handleBookingSubmit}>
          <div className="mb-4">
            <label className="block mb-2">Start Date:</label>
            <input
              type="date"
              value={selectedStartDate}
              onChange={(e) => {
                console.log(e.target.value);
                setSelectedStartDate(e.target.value);
              }}
              className="border p-2 rounded-md w-full"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">End Date:</label>
            <input
              type="date"
              value={selectedEndDate}
              onChange={(e) => setSelectedEndDate(e.target.value)}
              className="border p-2 rounded-md w-full"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Start Time:</label>
            <input
              type="time"
              value={selectedStartTime}
              onChange={(e) => {
                console.log(e.target.value);
                setSelectedStartTime(e.target.value);
                console.log(`${selectedStartDate} ${selectedStartTime}`);
              }}
              className="border p-2 rounded-md w-full"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">End Time:</label>
            <input
              type="time"
              value={selectedEndTime}
              onChange={(e) => setSelectedEndTime(e.target.value)}
              className="border p-2 rounded-md w-full"
            />
          </div>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-md"
            type="button"
            onClick={() => {
              return getUserId(localStorage.getItem("authtoken"));
            }}
          >
            Get Decoded data
          </button>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-md"
          >
            Book Room
          </button>
        </form>
      </div>
    </div>
  );
};

export default BookingForm;
