'use strict'

import express  from 'express';
import morgan from 'morgan';
import route  from './routes/api.route.js';

const server = express();
const port = 5000;

server.use(morgan('dev'));
server.use(express.json());
server.use(route);


server.listen(port, () => {
    console.log('🚀 server running on: http://localhost:'+port);
});