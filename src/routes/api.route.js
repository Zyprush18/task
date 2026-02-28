'use strict'

import express from 'express';
import { Login, logout, profile, refresh, Register } from '../handler/auth.handler.js';
import { checkAuth } from '../middleware/auth.middleware.js';

const route = express.Router();

// auth
route.post('/register', Register);
route.post('/login', Login);
route.post('/logout', checkAuth, logout);
route.post('/refresh', refresh);
route.get('/profile', checkAuth, profile);

export default route;