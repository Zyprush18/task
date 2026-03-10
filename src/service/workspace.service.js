import {
  createMember,
  createWorkspace,
  deleteMember,
  deleteWorskspaceByUser,
  getWorksapceById,
  getWorkspaceByUser,
  updateMember,
  updateWorkspaceByuser,
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

export const getWspaceById = async (id, owner_id) => {
  const data = await getWorksapceById(id, owner_id);
  if (!data) {
    throw new Error("not found");
  }

  return data;
};

export const updateWorkspace = async (req, workspace_id, owner_id) => {
  return await updateWorkspaceByuser(req, workspace_id, owner_id);
};

export const deleteWorkspace = async (workspace_id, owner_id) => {
  const now = new Date();
  return await deleteWorskspaceByUser(
    workspace_id,
    owner_id,
    now.toISOString(),
  );
};

export const addMemberWorkspace = async (id_user, workspace_id, owner_id) => {
  return await createMember(id_user, workspace_id, owner_id);
};

export const updateMemberWorkspace = async (
  reqData,
  workspace_id,
  owner_id,
  old_member_id
) => {
  const now = new Date().toISOString();
  return await updateMember(reqData, workspace_id, owner_id, old_member_id,now);
};


export const deleteMemberWorkspace = async (owner_id, member_id, workspace_id) => {
    const now = new Date().toISOString();
    return await deleteMember(owner_id,member_id, workspace_id, now);
}