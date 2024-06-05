const crudRepository = require ('./crud-Repository');
const { Booking } = require('../models');
const {StatusCodes} = require('http-status-codes')

class BookingRepository extends crudRepository {
    constructor(){
        super(Booking);
    }
}
module.exports = BookingRepository;