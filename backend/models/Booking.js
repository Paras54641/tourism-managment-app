const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  place: { type: mongoose.Schema.Types.ObjectId, ref: 'Place', required: true },
  date: { type: Date, required: true },
  ticketNumber: { type: String, required: true, unique: true },
});

module.exports = mongoose.model('Booking', bookingSchema);
