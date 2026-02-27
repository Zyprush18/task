'use strict'

import express from 'express';
import { Login, logout, Register } from '../handler/auth.handler.js';
import { checkAuth } from '../middleware/auth.middleware.js';

const route = express.Router();

route.post('/register', Register);
route.post('/login', Login);
route.get('/logout', checkAuth, logout);


export default route;