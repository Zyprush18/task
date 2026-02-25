'use strict'

import express from 'express';
import { Login, Register } from '../handler/auth.handler.js';

const route = express.Router();

route.post('/register', Register);
route.post('/login', Login);


export default route;