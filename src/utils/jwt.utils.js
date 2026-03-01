import jwt from 'jsonwebtoken';

export const blaclistToken = new Set();

const secret_key_access_token = process.env.SECRET_ACCESS_KEY
const secret_key_refresh_token = process.env.SECRET_REFRESH_KEY

export const generateToken = (id, email) => {
    const sign = jwt.sign({
        id_user: id,
        email_user: email
    }, secret_key_access_token, {algorithm: 'HS256', expiresIn: '15m', issuer: 'validation auth'});

    return sign
}

export const generateRefreshRoken = (id) =>{
    const sign = jwt.sign({
        id_user: id,
    }, secret_key_refresh_token, {algorithm: 'HS256', expiresIn: '7d'});

    return sign
}


export const verificationToken = (status,token) => {
    switch (status) {
        case 'access_token':
            return jwt.verify(token, secret_key_access_token, {algorithms: 'HS256'});
        default:
            return jwt.verify(token, secret_key_refresh_token, {algorithms: 'HS256'});
    }
}


