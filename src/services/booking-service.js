const { BookingRepository } = require('../repository/index.js');
const { FLIGHT_SERVICE_PATH } = require('../config/serverConfig.js');
const axios = require('axios');
const { ServiceError } = require('../utils/errors/index.js');

const createBooking = async function(data){
    try {
        const flightId = data.flightId;
        const getFlightRequestUrl = `${FLIGHT_SERVICE_PATH}/api/v1/flights/${flightId}`; 
        const response = await axios.get(getFlightRequestUrl);
        const flightData = response.data.data;
        let priceOfTheFlight = flightData.price;
        if(data.noOfSeats > flightData.totalSeats){
            throw ServiceError('Something went wrong in the booking process',
                               'Insufficient seats in the flight');
        }
        const totalCost = priceOfTheFlight * data.noOfSeats;
        const bookingPayload = {...data, totalCost};
        const booking = await BookingRepository.createBooking(bookingPayload);
        const updateFlightRequestURL = `${FLIGHT_SERVICE_PATH}/api/v1/flights/${booking.flightId}`;
        await axios.patch(updateFlightRequestURL, {totalSeats: flightData.totalSeats - booking.noOfSeats});
        const finalBooking  = await BookingRepository.updateBooking(booking.id, { status : "Booked"});
        return finalBooking;

    } catch (error) {
        if(error.name == 'RepositoryError' || error.name == 'ValidationError'){
            throw error;
        }
        throw ServiceError();
    }
}

module.exports = {
    createBooking
}