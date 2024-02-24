const express = require("express");

const router = express.Router();

const {
  getAllRooms,
  createBooking,
  getUserData,
  getAllProviders,
  getRoomsByProviderId,
} = require("../controllers/roomController.js");

router.get("/getallrooms", getAllRooms);

router.get("/getAllProviders", getAllProviders);

router.get("/provider/:provider_id", getRoomsByProviderId);

router.post("/booking", createBooking);

module.exports = router;
