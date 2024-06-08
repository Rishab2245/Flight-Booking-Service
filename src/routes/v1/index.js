const express = require('express');
const router = express.Router();
const BookingRoutes = require('./booking-routes');

router.use('/bookings', BookingRoutes);

module.exports = router;