import prisma from "../prisma/prismaClient.js";

export const getWorkspaceByUser = async (id) =>{
    return await prisma.workspace.findMany({
        where: {
            workspaceMem: {
                some:{
                    user_id: id,
                    deleted_at: null
                }
            },
            deleted_at: null
        },
        include: {
            board: true,
            workspaceMem: true
        },
    })
}

export const createWorkspace = async (req) => {
    return await prisma.workspace.create({
        data: req
    });
}

export const getWorksapceById = async (workspace_id, owner_id) => {
    const workspace =  await prisma.workspace.findUnique({
            where: {
                id: workspace_id,
                workspaceMem: {
                    some: {
                        user_id: owner_id,
                        deleted_at: null
                    }
                },
                deleted_at: null
            },
            include: {
                board: true,
                workspaceMem: true
            }
        })

    if (!workspace) {
        throw new Error(`not found`);      
    }

    return workspace
}

export const createMember = async (member_id, worspace_id,owner_id) => {
    return await prisma.$transaction(async (tx) => {
        const workspace = await getWorksapceById(worspace_id, owner_id)

        const users = await tx.users.findUnique({
            where:{
                id: member_id,
                deleted_at: null
            }
        })

        if (!users) {
            throw new Error(`not found user id: ${member_id}`);      
        }

        const member = await tx.workspaceMember.create({
            data: {
                role: 'member',
                user: {
                    connect: {
                        id: users.id
                    }
                },
                workspace: {
                    connect: {
                        id: workspace.id
                    }
                }
            }
        })

        return member
    })
}