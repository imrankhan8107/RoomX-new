const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const BookingSchema = new Schema({
  roomId: {
    type: Schema.Types.ObjectId,
    ref: "Room",
    required: true,
  },
  provider_id: {
    type: Schema.Types.ObjectId,
    ref: "Provider",
    required: true,
  },
  users: {
    type: Schema.Types.ObjectId,
    ref: "User",
    // required: true,
  },
  startDate: {
    type: Date,
  },
  endDate: {
    type: Date,
  },
  startTime: {
    type: Date, // For hourly bookings
    required: false,
  },
  endTime: {
    type: Date,
    required: false,
  },
});

const BookingModel = mongoose.model("Booking", BookingSchema);

module.exports = BookingModel;
