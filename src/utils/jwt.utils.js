'use strict'

import jwt from 'jsonwebtoken';

export const blaclistToken = new Set();

const secret_key = process.env.SECRET_KEY

export const generateToken = (id, email) => {
    const sign = jwt.sign({
        id_user: id,
        email_user: email
    }, secret_key, {algorithm: 'HS256', expiresIn: '1h', issuer: 'validation auth'});

    return sign
}


export const verificationToken = (token) => {
    return jwt.verify(token, secret_key, {algorithms: 'HS256'});
}


