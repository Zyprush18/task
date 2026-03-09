import prisma from "../prisma/prismaClient.js"

export const getALlTask = async (user_id) => {
    return await prisma.task.findMany({
        where: {
            deleted_at: null,
            column: {
                board: {
                    workspace: {
                        workspaceMem: {
                            some: {
                                user_id: user_id,
                                deleted_at: null
                            }
                        }
                    }
                }
            }
        },
        include: {
            column: true
        }
    });
}


export const createTask = async (req, column_id) => {
    return await prisma.task.create({
        data: {
            title: req.title,
            position: req.position,
            description: req.description,
            column: {
                connect: {
                    id: column_id
                }
            }
        }
    });
}

export const GetTask = async (user_id, id_task) => {
    return await prisma.task.findFirst({
        where: {
            id: id_task,
            deleted_at: null,
            column: {
                board: {
                    workspace: {
                        workspaceMem: {
                            some: {
                                user_id: user_id,
                                deleted_at: null
                            }
                        },
                    },
                },
                deleted_at: null
            }
        },
        include: {
            column: true
        }
    })
} 