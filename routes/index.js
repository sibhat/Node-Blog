require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
var cors = require('cors');
const server = express();
const handleError = require('./handlers/error');

server.use(express.json());
server.use(morgan('short'));
server.use(cors());

const apiRouter = require('./api')

server.use('/api', apiRouter)
server.use((req, res, next) => {
    let error = new Error('couldnt find what you looking for!');
    error.status = 404;
    next(error);
})
server.use(handleError);

const PORT_NUMBER = 8000;
server.listen(PORT_NUMBER, () => console.log(`APP is running on ${PORT_NUMBER}`));