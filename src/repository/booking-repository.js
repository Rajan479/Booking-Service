const { ValidationError, AppError } = require('../utils/errors/index.js');
const { StatusCodes } = require('http-status-codes');
const { Booking } = require('../models/index.js');

const createBooking = async function(data){
    try {
        const booking = await Booking.create(data);
        return booking;
    } catch (error) {
        if(error.name == 'SequelizeValidationError'){
            throw ValidationError(error);
        }
        throw AppError('RepositoryError', 
                       'Cannot create Booking', 
                       'There was som issue creating the booking, please try again later',
                       StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

module.exports = {
    createBooking
};