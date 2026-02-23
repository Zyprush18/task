'use strict'

import express from 'express';
import { Index } from '../handler/user.handler.js';

const route = express.Router();

route.get('/users', Index);

export default route;