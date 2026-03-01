import express from 'express';
import { Login, logout, profile, refresh, Register } from '../handler/auth.handler.js';
import { checkAuth } from '../middleware/auth.middleware.js';
import { showWorkspace, storeMemWorkspace, storeOwnerWorkspace,  WorkspaceIndex } from '../handler/workspace.handler.js';

const route = express.Router();

// auth
route.post('/register', Register);
route.post('/login', Login);
route.post('/logout', checkAuth, logout);
route.post('/refresh', refresh);
route.get('/profile', checkAuth, profile);


// workspace
route.get('/workspace', checkAuth, WorkspaceIndex);
route.post('/workspace/create', checkAuth, storeOwnerWorkspace);
route.post('/workspace/create/:id_workspace', checkAuth, storeMemWorkspace);
route.get('/workspace/:id_workspace', checkAuth, showWorkspace);

export default route;