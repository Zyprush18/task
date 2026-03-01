import {
  createMember,
  createWorkspace,
  getWorksapceById,
  getWorkspaceByUser,
} from "../repository/workspace.repo.js";

export const getWorksapce = async (id) => {
  const data = await getWorkspaceByUser(id);

  if (!data) {
    throw new Error("not found workspace");
  }

  return data;
};

export const addOwnerWorkspace = async (id, bodyreq) => {
  const updateReq = {
    name: bodyreq.data.name,
    workspaceMem: {
      create: [
        {
          role: "owner",
          user_id: id,
        },
      ],
    },
  };

  return await createWorkspace(updateReq);
};

export const addMemberWorkspace = async (id_user, workspace_id, owner_id) => {
  return await createMember(id_user, workspace_id, owner_id);
};

export const getWspaceById = async (id, owner_id) => {
  const data = await getWorksapceById(id, owner_id);
  if (!data) {
    throw new Error("not found");
  }

  return data;
};
