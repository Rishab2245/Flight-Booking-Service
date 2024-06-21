const { BookingRepository } = require('../repositories');
const bookingRepository = new BookingRepository();
const axios = require('axios');
const db = require('../models');
const {ServerConfig} = require('../config');
const { StatusCodes} = require('http-status-codes');
const {appError} = require('../utils');
const {Enums} = require('../utils/common');
const {BOOKED} = Enums.BOOKING_STATUS;


async function createBooking(data){
    try{
        const result = await db.sequelize.transaction(async function bookingImpl(t){
            const flight = await axios.get(`${ServerConfig.FLIGHT_SERVICE}/api/v1/flights/${data.flightId}`);
            const flightDetails = flight.data.data;
            let priceOfTheFlight = flightDetails.price;
            if(data.noOfSeats > flightDetails.totalSeats){
                throw new appError("Not enough seats were available", StatusCodes.BAD_REQUEST);
            }
            const totalCost = priceOfTheFlight * data.noOfSeats;
            const bookingPayLoad = { ...data , totalCost};
            const booking = await bookingRepository.create(bookingPayLoad);
            await axios.patch(`${ServerConfig.FLIGHT_SERVICE}/api/v1/flights/${data.flightId}/seats` , { flightId : data.flightId ,seats: data.noOfSeats});
            booking.status = BOOKED;
            await booking.save();
            return booking.dataValues;
        });
        console.log(result);
        return result;
    }
    catch(err){ 
        // console.log(err);
        throw err;
    }
}
module.exports = {
createBooking
}
