const express = require('express');
const { bookPlace, getBookings } = require('../controllers/bookingController');
const router = express.Router();

router.post('/', bookPlace);
router.get('/', getBookings);

module.exports = router;
