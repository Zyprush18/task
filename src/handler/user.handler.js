'use strict'

import { addUser, getAllUser } from "../service/user.service.js";

export const Index = async (req, res) => {
    try {
        const bodyReq = req.body;
        addUser(bodyReq);
        const data = await getAllUser();
         res.status(200).json({
        message: "success",
        data: data,
      });
    } catch (error) {
         res.status(500).json({
        message: "internal server Error",
      });
    }
};
