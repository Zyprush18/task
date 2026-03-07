import express  from 'express';
import morgan from 'morgan';
import route  from './routes/api.route.js';
import { middleware } from 'express-http-context';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import rateLimit from 'express-rate-limit';

const server = express();
const port = 5000;
const limit = rateLimit({
    windowMs: 10 * 60 * 1000,
    limit: 50,
    standardHeaders: true
});

server.use(morgan('dev'));
server.use(express.json());
server.use(middleware);
server.use(cookieParser());
server.use(cors());
server.use(limit);
server.use('/api',route);


server.listen(port, () => {
    console.log('🚀 server running on: http://localhost:'+port);
});