const RoomModel = require("../models/room");

const BookingModel = require("../models/booking");
const ProviderModel = require("../models/providers");

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

    await RoomModel.findByIdAndUpdate(roomId, { available: false });

    res.status(201).json({ success: true, booking: newBooking });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
}

async function getAllProviders(req, res) {
  try {
    const location = req.query.location;
    if (location) {
      const providers = await ProviderModel.find({
        provider_address: {
          $regex: new RegExp(location, "i"),
        },
      });
      console.log(providers);
      return res.status(200).json({ success: true, providers });
    } else {
      const providers = await ProviderModel.find();
      return res.status(200).json({ success: true, providers });
    }
  } catch (error) {
    console.error("Error getting all providers:", error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
}

async function getRoomsByProviderId(req, res) {
  try {
    const { provider_id } = req.params;
    const rooms = await RoomModel.find({ provider_id });
    res.status(200).json({ success: true, rooms });
  } catch (error) {
    console.error("Error getting rooms by provider id:", error);
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
  getAllProviders,
  getRoomsByProviderId,
};
