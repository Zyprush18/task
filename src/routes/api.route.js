'use strict'

import express from 'express';
import { Index } from '../handler/user.handler.js';
import { Register } from '../handler/auth.handler.js';

const route = express.Router();

route.post('/register', Register);
route.get('/users', Index);

export default route;