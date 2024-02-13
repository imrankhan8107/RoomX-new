const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const RoomSchema = new Schema({
  roomId: {
    type: String,
    required: true,
    unique: true, // Ensure uniqueness
  },
  room_name: {
    type: String,
    required: true,
  },
  capacity: {
    type: Number,
    required: true,
  },
  available: {
    type: Boolean,
    required: true,
    default: true,
  },
  price: {
    type: Number,
    required: true,
    default: 0,
  },
  provider_id: {
    type: String,
    ref: "Provider",
    required: true,
  },
});

const RoomModel = mongoose.model("Room", RoomSchema);

module.exports = RoomModel;
