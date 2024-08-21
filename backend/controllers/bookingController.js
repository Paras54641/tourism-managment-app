const Booking = require('../models/Booking');
const Place = require('../models/Place');
const User = require('../models/User');
const { v4: uuidv4 } = require('uuid');

exports.bookPlace = async (req, res) => {
  const { userId, placeId, date } = req.body;
  try {
    const booking = await Booking.create({
      user: userId,
      place: placeId,
      date,
      ticketNumber: uuidv4(),
    });
    res.status(201).json({ success: true, data: booking });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

exports.getBookings = async (req, res) => {
  try {
    const bookings = await Booking.find().populate('user').populate('place');
    res.json({ success: true, data: bookings });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};
