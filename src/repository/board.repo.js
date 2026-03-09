import prisma from "../prisma/prismaClient.js";

export const getAllBoards = async (user_id) => {
  return await prisma.board.findMany({
    where: {
      workspace: {
        workspaceMem: {
          some: {
            user_id: user_id,
          },
        },
      },
      deleted_at: null,
    },
    include: {
      workspace: true,
      column: {
        where: {
          deleted_at: null,
        },
      },
    },
  });
};

export const createBord = async (req) => {
  return prisma.$transaction(async (tx) => {
    const board = await tx.board.create({
      data: {
        name: req.name,
        workspace: {
          connect: {
            id: req.workspace_id,
          },
        },
      },
    });

    // create default column
    return await tx.column.createMany({
      data: [
        {
          name: "to do",
          board_id: board.id,
          
        },
        {
          name: "on progres",
          board_id: board.id,
        },
        {
          name: "done",
          board_id: board.id,
        },
      ],
    });
  });
};

export const getBoardbyId = async (user_id, id) => {
  const board = await prisma.board.findUnique({
    where: {
      id: id,
      workspace: {
        workspaceMem: {
          some: {
            user_id: user_id,
            deleted_at: null,
          },
        },
      },
      deleted_at: null,
    },
    include: {
      workspace: true,
      column: {
        where: {
          deleted_at: null,
        },
      },
    },
  });

  if (!board) {
    throw new Error("not found");
  }

  return board;
};

export const boardUpdate = async (id, user_id, req) => {
  return prisma.board.update({
    where: {
      id: id,
      workspace: {
        workspaceMem: {
          some: {
            user_id: user_id,
            deleted_at: null,
          },
        },
      },
      deleted_at: null,
    },
    data: req,
  });
};

export const boardDelete = async (id, user_id, time) => {
  return prisma.$transaction(async (tx) => {
    await tx.column.updateMany({
      where: {
        board_id: id,
        deleted_at: null,
      },
      data: {
        deleted_at: time,
      },
    });

    return tx.board.update({
      where: {
        id: id,
        workspace: {
          workspaceMem: {
            some: {
              user_id: user_id,
              deleted_at: null,
            },
          },
        },
        deleted_at: null,
      },
      data: {
        deleted_at: time,
        column: {
          updateMany: {
            data: {
              deleted_at: time
            }
          }
        }
      },
    });
  });
};

export const createColumn = async (user_id,req) => {
  return await prisma.$transaction(async (tx)=> {
    const board = await getBoardbyId(user_id, req.board_id);
    if (!board) {
      throw new Error("not found");
    }

    return await tx.column.create({
      data: {
        name: req.name,
        board: {
          connect: {
            id: board.id
          }
        }
      }
    })
  });
}

export const columnUpdate = async (id,user_id, req) => {
  return await prisma.column.update({
      where: {
        id: id,
        deleted_at: null,
        board: {
          id: req.board_id,
          deleted_at: null,
          workspace: {
            workspaceMem: {
              some: {
                user_id: user_id
              }
            }
          }
        }
      },
      data: {
        name: req.name
      }
    });
}


export const columnDelete = async (id, user_id,board_id, time) => {
  return await prisma.column.update({
    where: {
        id: id,
        deleted_at: null,
        board: {
          id: board_id,
          deleted_at: null,
          workspace: {
            workspaceMem: {
              some: {
                user_id: user_id
              }
            }
          }
        }
      },
      data: {
        deleted_at: time,
        task: {
          updateMany: {
            where: {
              column_id: id
            },
            data: {
              deleted_at: null
            }
          }
        }
      }
  });
}