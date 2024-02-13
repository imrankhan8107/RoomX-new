const RoomModel = require("../models/room");

const BookingModel = require("../models/booking");

async function createBooking(req, res) {
  try {
    const {
      roomId,
      users,
      provider_id,
      startDate,
      endDate,
      startTime,
      endTime,
    } = req.body;

    const newBooking = new BookingModel({
      roomId,
      provider_id,
      users,
      startDate,
      endDate,
      startTime,
      endTime,
    });

    await newBooking.save();

    // await RoomModel.findByIdAndUpdate(room, { available: false });

    res.status(201).json({ success: true, booking: newBooking });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
}

async function getAllRooms(req, res) {
  try {
    // Fetch rooms from the database
    const rooms = await RoomModel.find();
    res.json({ rooms });
  } catch (error) {
    console.error("Error fetching rooms:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

module.exports = {
  getAllRooms,
  createBooking,
};
