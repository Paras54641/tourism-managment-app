const Place = require('../models/Place');

exports.getPlaces = async (req, res) => {
  try {
    const places = await Place.find();
    res.json({ success: true, data: places });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

exports.addPlace = async (req, res) => {
  try {
    const place = await Place.create(req.body);
    res.status(201).json({ success: true, data: place });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};
