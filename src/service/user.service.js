'use strict'

import { createUsers, getAll } from "../repository/user.repo.js";
import { hashingPw } from "../utils/hashing.utils.js";

export const getAllUser = async () => {    
    return getAll();
};

export const addUser = async (bodyReq) => {
    console.log(bodyReq);
    
    bodyReq.password = hashingPw(bodyReq.password);
    return createUsers(bodyReq);
}
