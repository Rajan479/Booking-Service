const amqplib = require('amqplib');
const { MESSAGE_BROKER_URL, EXCHANAGE_NAME } = require('../config/serverConfig.js');

const createChannel = async function(){
    try {
        const connection = await amqplib.connect(MESSAGE_BROKER_URL);
        const channel = await connection.createChannel();
        await channel.assertExchange(EXCHANAGE_NAME, 'direct', false);
        return channel;
    } catch (error) {
        throw error;
    }
}

const subscribeMessage = async function(channel, service, binding_key){
    try {
        const applicationQueue = await channel.assertQueue(QUEUE_NAME);

        channel.bindQueue(applicationQueue.queue, EXCHANAGE_NAME, binding_key);
        channel.consume(applicationQueue.queue, function(msg){
            console.log('received data');
            console.log(msg.content.toString());
            channel.ack(msg);
        });
    } catch (error) {
        throw error;
    }
}

const publishMessage = async function(channel, binding_key, message){
    try {
        await channel.assertQueue('QUEUE_NAME');
        await channel.publish(EXCHANAGE_NAME, binding_key, Buffer.from(message));
    } catch (error) {
        throw error;
    }
}

module.exports = {
    createChannel,
    subscribeMessage, 
    publishMessage
}