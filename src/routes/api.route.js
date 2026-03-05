import express from "express";
import {
  Login,
  logout,
  profile,
  refresh,
  Register,
} from "../handler/auth.handler.js";
import { checkAuth } from "../middleware/auth.middleware.js";
import {
  deletedWorkspace,
  deleteMemWorkpace,
  showWorkspace,
  storeMemWorkspace,
  storeOwnerWorkspace,
  UpdatedWorkspace,
  updateMemWorkspace,
  WorkspaceIndex,
} from "../handler/workspace.handler.js";

const route = express.Router();

// auth
route.post("/register", Register);
route.post("/login", Login);
route.post("/logout", checkAuth, logout);
route.post("/refresh", refresh);
route.get("/profile", checkAuth, profile);

// workspace
route.get("/workspace", checkAuth, WorkspaceIndex);
route.post("/workspace/create", checkAuth, storeOwnerWorkspace);
route.get("/workspace/:id_workspace", checkAuth, showWorkspace);
route.put("/workspace/:id_workspace", checkAuth, UpdatedWorkspace);
route.delete("/workspace/:id_workspace", checkAuth, deletedWorkspace);

// workspace member
route.post("/workspace/createMem/:id_workspace", checkAuth, storeMemWorkspace);
route.put("/workspace/updateMem/:id_workspace", checkAuth, updateMemWorkspace);
route.delete("/workspace/:id_workspace/deleteMem/:id_member", checkAuth, deleteMemWorkpace);

export default route;
