'use strict'

import { getAll } from "../repository/user.repo.js";

export const getAllUser = async () => {    
    return getAll();
};
