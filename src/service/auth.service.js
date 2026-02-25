'use strict'

import { LoginRepo, RegisterRepo } from "../repository/user.repo.js";
import { hashingPw, verifiedPw } from "../utils/hashing.utils.js";
import { generateToken } from "../utils/jwt.utils.js";

export const registerService = async (bodyReq) => {
   try {
        bodyReq.password = hashingPw(bodyReq.password);
        return await RegisterRepo(bodyReq);
   } catch (error) {
     if (error.code === 'P2002') {
        throw new Error("data exists");
     }
   }
}

export const loginService =  async (bodyreq) =>{
    const data = await LoginRepo(bodyreq.email);
    if (data === null) {
        throw new Error("data not found");    
    }
    
    if (!verifiedPw(bodyreq.password, data.password)) {
        throw new Error("data not found");  
    }

    const token = generateToken(data.id, data.email);

    return token
}


