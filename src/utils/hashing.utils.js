'use strict';

import bcrypt from 'bcryptjs';


export const hashingPw = (pass) =>{
    const hash =  bcrypt.genSaltSync(12);
    return bcrypt.hashSync(pass, hash)
}

export const verifiedPw = (pass,hashPW) => {
    return bcrypt.compareSync(pass, hashPW);
}
