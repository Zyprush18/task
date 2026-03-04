import { get } from "express-http-context";
import {
  addMemberWorkspace,
  addOwnerWorkspace,
  deleteWorkspace,
  getWorksapce,
  getWspaceById,
  updateMemberWorkspace,
  updateWorkspace,
} from "../service/workspace.service.js";
import {
  workspaceMemSchema,
  workspaceSchema,
} from "../validation/workspace.validation.js";

export const WorkspaceIndex = async (req, res) => {
  try {
    const id = get("user_id");
    const data = await getWorksapce(id);

    res.status(200).json({
      message: "success",
      data: data,
    });
  } catch (error) {
    if (error.message === "not found workspace") {
      return res.status(404).json({
        message: "Invalid Email or Password",
      });
    }

    res.status(500).json({
      message: "internal server Error",
    });
  }
};

export const storeOwnerWorkspace = async (req, res) => {
  try {
    const bodyreq = workspaceSchema.safeParse(req.body);
    if (!bodyreq.success) {
      return res.status(400).json({
        message: "Validation Error",
        error: bodyreq.error.format(),
      });
    }
    const id = get("user_id");
    await addOwnerWorkspace(id, bodyreq);

    res.status(201).json({
      message: "success add new workspace",
    });
  } catch (error) {
    res.status(500).json({
      message: "internal server error",
    });
  }
};

export const showWorkspace = async (req, res) => {
  try {
    const workspace_id = req.params.id_workspace;
    if (!workspace_id) {
      return res.status(400).json({
        message: "params worksapce id is missing",
      });
    }

    const owner_id = get("user_id");
    const data = await getWspaceById(parseInt(workspace_id), owner_id);

    res.status(200).json({
      message: "success",
      data: data,
    });
  } catch (error) {
    if (error.message === "not found") {
      return res.status(404).json({
        message: "not found workspace",
      });
    }
    res.status(500).json({
      message: "internal server Error",
    });
  }
};

export const UpdatedWorkspace = async (req, res) => {
  try {
    const workspace_id = parseInt(req.params.id_workspace);
    if (!workspace_id) {
      return res.status(400).json({
        message: "params worksapce id is missing",
      });
    }

    const owner_id = get("user_id");

    const bodyreq = workspaceSchema.safeParse(req.body);
    if (!bodyreq.success) {
      return res.status(400).json({
        message: "Validation Error",
        error: bodyreq.error.format(),
      });
    }

    await updateWorkspace(bodyreq.data, workspace_id, owner_id);
    res.status(200).json({
      message: "success update",
    });
  } catch (error) {
    if (error.code === "P2025") {
      return res.status(404).json({
        message: "not found workspace",
      });
    }
    res.status(500).json({
      message: "internal server error",
    });
  }
};

export const deletedWorkspace = async (req, res) => {
  try {
    const workspace_id = parseInt(req.params.id_workspace);
    if (!workspace_id) {
      return res.status(400).json({
        message: "params worksapce id is missing",
      });
    }

    const owner_id = get("user_id");

    await deleteWorkspace(workspace_id, owner_id);
    res.status(200).json({
      message: "success delete",
    });
  } catch (error) {
    if (error.code === "P2025" || error.message == "not found") {
      return res.status(404).json({
        message: "not found workspace",
      });
    }
    res.status(500).json({
      message: "internal server error",
    });
  }
};

export const storeMemWorkspace = async (req, res) => {
  try {
    const bodyreq = workspaceMemSchema.safeParse(req.body);
    if (!bodyreq.success) {
      return res.status(400).json({
        message: "Validation Error",
        error: bodyreq.error.format(),
      });
    }
    const workspace_id = req.params.id_workspace;
    if (!workspace_id) {
      return res.status(400).json({
        message: "params worksapce id is missing",
      });
    }
    const owner_id = get("user_id");
    await addMemberWorkspace(
      bodyreq.data.user_id,
      parseInt(workspace_id),
      owner_id,
    );

    return res.status(201).json({
      message: "success add member",
    });
  } catch (error) {
    if (error.message === "not found") {
      return res.status(404).json({
        message: "not found user or workspace",
      });
    }
    res.status(500).json({
      message: "internal server error",
    });
  }
};

export const updateMemWorkspace = async (req, res) => {
  try {
    const bodyreq = workspaceMemSchema.safeParse(req.body);
    
    if (!bodyreq.success) {
      return res.status(400).json({
        message: "Validation Error",
        error: bodyreq.error.format() ?? "field old_user_id is required",
      });
    }
    const workspace_id = req.params.id_workspace;
    if (!workspace_id) {
      return res.status(400).json({
        message: "params worksapce id is missing",
      });
    }
    const owner_id = get("user_id");
    await updateMemberWorkspace(bodyreq.data, parseInt(workspace_id), owner_id);

    return res.status(200).json({
      message: "success update member",
    });
  } catch (error) {
    if (error.message === "not found") {
      return res.status(404).json({
        message: "not found user or workspace",
      });
    }else if (error.code === 'P2002'){
      return res.status(400).json({
        message: "user already exists",
      });
    }
    res.status(500).json({
      message: "internal server error",
    });
  }
};
