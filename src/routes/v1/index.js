const express = require('express');
const router = express.Router();
const BookingRoutes = require('./booking-routes');
const {InfoController} = require('../../controllers');

router.use('/bookings', BookingRoutes);
router.get('/info', InfoController.info);

module.exports = router;