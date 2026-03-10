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
        }
    })
} 

export const updateTask = async (user_id, id, column_id, data) => {
    return await prisma.task.update({
        where: {
            id: id,
            deleted_at: null,
            column: {
                id: column_id,
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
        data: data
    });
}

export const deleteTask = async (user_id, id, column_id, time) => {
    return await prisma.task.update({
        where: {
            id: id,
            deleted_at: null,
            column: {
                id: column_id,
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
        data: {
            deleted_at: time
        }
    });
}


export const moveColumn = async (id_task, user_id, column_id, req) => {
    return await prisma.task.update({
        where: {
            id: id_task,
            deleted_at: null,
            column: {
                id: column_id,
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
        data: {
            column: {
                connect: {
                    id: req.new_id_column
                }
            }
        }
    });
}