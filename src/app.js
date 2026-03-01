import express  from 'express';
import morgan from 'morgan';
import route  from './routes/api.route.js';
import { middleware } from 'express-http-context';
import cookieParser from 'cookie-parser';
import cors from 'cors';

const server = express();
const port = 5000;

server.use(morgan('dev'));
server.use(express.json());
server.use(middleware);
server.use(cookieParser());
server.use(cors());
server.use('/api',route);


server.listen(port, () => {
    console.log('🚀 server running on: http://localhost:'+port);
});