const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const placeRoutes = require('./routes/places');
const bookingRoutes = require('./routes/bookings');

const app = express();

app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/tourism', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, '../public')));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/places', placeRoutes);
app.use('/api/bookings', bookingRoutes);

// Homepage route
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});
app.get('/', (req, res) => {
  res.send('Welcome to the Himachal Pradesh Tourism Management System!');
});


const PORT = process.env.PORT || 7000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
