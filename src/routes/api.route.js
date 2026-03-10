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
import {
  BoardIndex,
  deleteBoard,
  deleteColumn,
  ShowBoard,
  StoreBoard,
  storeColumn,
  updateBoard,
  updateColumn,
} from "../handler/board.handler.js";
import { TaskDelete, TaskIndex, TaskShow, TaskStore, TaskUpdate } from "../handler/task.handler.js";

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
route.post("/workspace/:id_workspace/member", checkAuth, storeMemWorkspace);
route.put("/workspace/:id_workspace/member/:id_old_member", checkAuth, updateMemWorkspace);
route.delete("/workspace/:id_workspace/member/:id_member", checkAuth, deleteMemWorkpace);

// board
route.get("/board", checkAuth, BoardIndex);
route.post("/board/create", checkAuth, StoreBoard);
route.get("/board/:id_board", checkAuth, ShowBoard);
route.put("/board/:id_board", checkAuth, updateBoard);
route.delete("/board/:id_board", checkAuth, deleteBoard);

// column
route.post("/board/:id_board/column/create", checkAuth, storeColumn);
route.put("/board/:id_board/column/:id_column", checkAuth, updateColumn);
route.delete("/board/:id_board/column/:id_column", checkAuth, deleteColumn);


// task
route.get("/task", checkAuth, TaskIndex);
route.post("/task/:column_id/create", checkAuth, TaskStore);
route.get("/task/:id_task", checkAuth, TaskShow);
route.put("/task/:id_task/column/:id_column", checkAuth, TaskUpdate);
route.delete("/task/:id_task/column/:id_column", checkAuth, TaskDelete);

export default route;
