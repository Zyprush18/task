"use strict";

import { get } from "express-http-context";
import { loginService, registerService } from "../service/auth.service.js";
import { loginSchema, registerSchema } from "../validation/auth.validtion.js";
import { blaclistToken } from "../utils/jwt.utils.js";

export const Register = async (req, res) => {
  try {
    const bodyreq = registerSchema.safeParse(req.body);
    if (!bodyreq.success) {
      return res.status(400).json({
        message: "Validation Error",
        error: bodyreq.error.format(),
      });
    }

    await registerService(bodyreq.data);

    res.status(201).json({
      message: "success",
    });
  } catch (error) {
    if (error.message == "data exists") {
      return res.status(400).json({
        message: "Email ALready Exists",
      });
    }

    res.status(500).json({
      message: "internal server Error",
    });
  }
};

export const Login = async (req, res) => {
  try {
    const bodyreq = loginSchema.safeParse(req.body);
    if (!bodyreq.success) {
      return res.status(400).json({
        message: "Validation Error",
        error: bodyreq.error.format(),
      });
    }

    const token = await loginService(bodyreq.data);

    res
      .status(201)
      .cookie("access_token", token, {
        httpOnly: true,
        secure: process.env.STATUS_APP === 'production',
        sameSite: "strict",
      })
      .json({
        message: "success login",
      });
  } catch (error) {
    if (error.message === "data not found") {
      return res.status(404).json({
        message: "Invalid Email or Password",
      });
    }

    res.status(500).json({
      message: "internal server Error",
    });
  }
};

export const logout = async (req, res) => {
  res.status(200).clearCookie('access_token').json({
    message: "success logout",
  });
};
