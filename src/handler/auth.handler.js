"use strict";

import { addUser } from "../service/user.service.js";
import { registerSchema } from "../utils/validation.utils.js";

export const Register = async (req, res) => {
  try {
    const bodyreq = registerSchema.safeParse(req.body);
    if (!bodyreq.success) {
      return res.status(400).json({
        message: "Validation Error",
        error: bodyreq.error.format()
      });
    }

    addUser(bodyreq.data);

    res.status(201).json({
      message: "success",
    });
  } catch (error) {
    res.status(500).json({
      message: "internal server Error",
    });
  }
};
