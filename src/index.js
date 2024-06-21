const express = require('express');
const { ServerConfig , Queue} = require('./config');
const apiRoutes = require('./routes');
// const CRON = require('./utils/common/cron-jobs');
const amqplib = require("amqplib");
// const bodyParserErrorHandler = require('express-body-parser-error-handler');



const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended : true}));
// app.use(bodyParserErrorHandler());

app.use('/api', apiRoutes);
app.listen(ServerConfig.PORT, async () => {
    console.log(`Successfully started the server on PORT : ${ServerConfig.PORT}`);
    // CRON();
    Queue.connectQueue();
    // console.log('queue connected');
});




