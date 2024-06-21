const amqplib = require('amqplib');

let connection , channal ;

async function connectQueue(){
    try {
        const connection  = await amqplib.connect('amqp://localhost');
        const channal = await connection.createChannel();
        await channal.assertQueue("noti-queue"); 
    } catch (e) {
        console.log(e);
    }
}

async function sendData(data){
    try {
        await channal.sendToQueue("noti-queue",Buffer.from(JSON.stringify(data)));
    } catch (e) {
        console.log(e);
    }
}

module.exports ={
    connectQueue,
    sendData
}