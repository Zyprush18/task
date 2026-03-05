import prisma from "../prisma/prismaClient.js";

export const getWorkspaceByUser = async (id) => {
  return await prisma.workspace.findMany({
    where: {
      workspaceMem: {
        some: {
          user_id: id,
        },
      },
      deleted_at: null,
    },
    include: {
      board: {
        where: {
          deleted_at: null,
        },
      },
      workspaceMem: {
        where: {
          deleted_at: null,
        },
      },
    },
  });
};

export const createWorkspace = async (req) => {
  return await prisma.workspace.create({
    data: req,
  });
};

export const getWorksapceById = async (workspace_id, owner_id) => {
  const workspace = await prisma.workspace.findUnique({
    where: {
      id: workspace_id,
      workspaceMem: {
        some: {
          user_id: owner_id,
          deleted_at: null,
        },
      },
      deleted_at: null,
    },
    include: {
      board: true,
      workspaceMem: true,
    },
  });

  if (!workspace) {
    throw new Error(`not found`);
  }

  return workspace;
};

export const updateWorkspaceByuser = async (req, workspace_id, owner_id) => {
  return await prisma.workspace.update({
    where: {
      id: workspace_id,
      workspaceMem: {
        some: {
          user_id: owner_id,
          role: "owner",
          deleted_at: null,
        },
      },
      deleted_at: null,
    },
    data: req,
  });
};

export const deleteWorskspaceByUser = async (workspace_ids, owner_id, time) => {
  return prisma.$transaction(async (tx) => {
    const member = await tx.workspaceMember.updateMany({
      where: {
        workspace_id: workspace_ids,
      },
      data: {
        deleted_at: time,
      },
    });

    if (!member) {
      throw new Error("not found");
    }

    return await tx.workspace.update({
      where: {
        id: workspace_ids,
        workspaceMem: {
          some: {
            user_id: owner_id,
            role: "owner",
          },
        },
        deleted_at: null,
      },
      data: {
        deleted_at: time,
      },
    });
  });
};

export const createMember = async (member_id, worspace_id, owner_id) => {
  return await prisma.$transaction(async (tx) => {
    const workspace = await getWorksapceById(worspace_id, owner_id);

    const users = await tx.users.findUnique({
      where: {
        id: member_id,
        deleted_at: null,
      },
    });

    if (!users) {
      throw new Error(`not found user id: ${member_id}`);
    }

    const member = await tx.workspaceMember.create({
      data: {
        role: "member",
        user: {
          connect: {
            id: users.id,
          },
        },
        workspace: {
          connect: {
            id: workspace.id,
          },
        },
      },
    });

    return member;
  });
};

export const updateMember = async (req, workspace_id, owner_id, time) => {
  return await prisma.$transaction(async (tx) => {
    const workspace = await getWorksapceById(workspace_id, owner_id);

    const users = await tx.users.findUnique({
      where: {
        id: req.user_id,
        deleted_at: null,
      },
    });

    if (!users) {
      throw new Error(`not found`);
    }

    const member = workspace.workspaceMem.find((wm) => {
      return (
        wm.role === "member" &&
        wm.user_id === req.user_id &&
        wm.workspace_id === workspace_id
      );
    });

    // ubah deleted_at member yang mau di update
      await tx.workspaceMember.update({
        where: {
          role: "member",
          user_id_workspace_id: {
            user_id: req.old_user_id,
            workspace_id: workspace.id,
          },
        },
        data: {
          deleted_at: time,
        },
      });


    if (member) {

      // ubah deleted_at member yang telah di hapus menjadi null
      await tx.workspaceMember.update({
        where: {
          role: "member",
          user_id_workspace_id: {
            user_id: req.user_id,
            workspace_id: workspace.id,
          },
        },
        data: {
          deleted_at: null,
        },
      });

      
    } else {
      return await prisma.workspaceMember.create({
        data: {
          role: "member",
          user: {
            connect: {
              id: users.id,
            },
          },
          workspace: {
            connect: {
              id: workspace.id,
            },
          },
        },
      });
    }
  });
};

export const deleteMember = async (owner_id, member_id, workspace_id, time) => {
 return prisma.$transaction(async (tx) => {
  const workspace = await getWorksapceById(workspace_id, owner_id);
  const users = await tx.users.findUnique({
      where: {
        id: member_id,
        deleted_at: null,
      },
    });

    if (!users) {
      throw new Error(`not found`);
    }


    return tx.workspaceMember.update({
      where: {
        role: 'member',
        user_id_workspace_id: {
          user_id: users.id,
          workspace_id: workspace.id
        },
        deleted_at: null
      },
      data: {
        deleted_at: time
      }
    });
 })
};
