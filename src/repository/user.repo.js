'use strict'

import prisma from "../prisma/prismaClient.js";

export const getAll = async () =>{
    return await prisma.users.findMany()
}


export const createUsers = async (userReq) => {
    return await prisma.users.create({
        data: userReq
    });
}