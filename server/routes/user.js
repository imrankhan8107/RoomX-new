const express = require('express');

const router = express.Router();

const {
    getAllRooms, createBooking, getUserData
}=require('../controllers/roomController.js')


router.get('/getallrooms',getAllRooms)
router.post('/booking',createBooking)


module.exports = router;
