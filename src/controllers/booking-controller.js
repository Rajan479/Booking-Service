const { BookingService } = require('../services/index.js');
const { StatusCodes } = require('http-status-codes');
const { createChannel, publishMessage } = require('../utils/messageQueue.js');
const { REMINDER_BINDING_KEY } = require('../config/serverConfig.js');

const create = async function(request, response){
    try {
        const result = await BookingService.createBooking(request.body);
        return response.status(StatusCodes.OK).json({
            message : 'Successfully completed booking',
            err : {},
            success : true,
            data : result
        });
    } catch (error) {
        return response.status(error.statusCode).json({
            message : error.message,
            err : error.explanation,
            success : false,
            data : {}
        });
    }
}

const sendMessageToQueue = async function(request, response){
    const channel = await createChannel();
    const data = {
        message : 'Success'
    }
    publishMessage(channel, REMINDER_BINDING_KEY, JSON.stringify(data));
    return response.status(200).json({
        message : 'Successfully published the event'
    });
}

module.exports = {
    create,
    sendMessageToQueue
}