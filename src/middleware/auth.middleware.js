'use strict'

import { set } from "express-http-context";
import { verificationToken } from "../utils/jwt.utils.js";

export const checkAuth = (req, res, next) => {
  try {
    const auth = req.headers.authorization;
    if (!auth) {
        return res.status(401).json({
            message: 'auth token is required'
        });
    }

    const token = auth.split(' ');
    if (token[0] !== 'Bearer' || token[1] === '') {
        return res.status(401).json({
            message: 'auth token is missing'
        });
    }

    // check jwt
    const data = verificationToken('access_token',token[1]);
    // set context
    set('user_id', data.id_user);
    set('email_user', data.email_user);

    next();
    } catch (error) {
        return res.status(401).json({
            message: error.message
        });
    }
};
