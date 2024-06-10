const { BookingRepository } = require('../repositories');
const axios = require('axios');
const db = require('../models');
const {ServerConfig} = require('../config');
const { StatusCodes} = require('http-status-codes');
const {appError} = require('../utils');


async function createBooking(data){
    try{
        const result = await db.sequelize.transaction(async function bookingImpl(t){
            const flight = axios.get(`${ServerConfig.FLIGHT_SERVICE}/api/v1/flights/${data.flightId}`);
            const flightDetails = flight.data.data;
            if(data.noOfSeats > flightDetails.totalSeats){
                throw new appError("Not enough seats were available", StatusCodes.BAD_REQUEST);
            }
            return true;
        });
    }
    catch(err){ 
        throw err;
    }
}
module.exports = {
createBooking
}