const {BookingService} = require('../services');
const { StatusCodes} = require ('http-status-codes');
const { successResponse , errorResponse } = require('../utils/common');

async function createBooking(req,res){
    try{
        console.log(req);
        booking = await BookingService.createBooking({
            flightId : req.body.flightId,
            noOfSeats : req.body.noOfSeats,
            userId : req.body.userId
        })
        // console.log(booking);
        successResponse.message = "booking is created succcessfully"
        // console.log(booking);t
        successResponse.data = booking;
        
        return res.status(StatusCodes.CREATED)
                  .json(successResponse);
    }catch(err){
        console.log(err);
      errorResponse.error = err;
      errorResponse.message = "something went wrong while booking the flight";

        return res.status(err.statusCode)
                  .json(errorResponse);
    }
}

module.exports = {
    createBooking
}