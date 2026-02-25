'use strict'

import prisma from "../prisma/prismaClient.js";


export const RegisterRepo = async (userReq) => {
    return await prisma.users.create({
        data: userReq
    });
}


export const LoginRepo = async (email) => {
    return await prisma.users.findUnique({
        where: {
            email: email
        }
    }); 
}