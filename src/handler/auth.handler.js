import { get } from "express-http-context";
import { generateTokenFromAccessToken, getProfile, loginService, registerService } from "../service/auth.service.js";
import { loginSchema, registerSchema } from "../validation/auth.validation.js";

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
      .cookie("refresh_token", token.refresh_token, {
        httpOnly: true,
        secure: process.env.STATUS_APP === "production",
        sameSite: "strict",
      })
      .json({
        message: "success login",
        access_token: token.access_token,
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
  res
    .status(200)
    .clearCookie("refresh_token", {
      httpOnly: true,
      secure: process.env.STATUS_APP === "production",
      sameSite: "strict",
    })
    .json({
      message: "success logout",
    });
};

export const refresh = async (req, res) => {
  try {
    const refresh = req.cookies.refresh_token;
    if (!refresh) {
      return res.status(401).json({
        message: "refresh token is missing",
      });
    }

    const access_token = await generateTokenFromAccessToken(refresh);

    res.status(200).json({
      message: "succcess generate new access token",
      new_access_token: access_token
    });
  } catch (error) {
    if (error.message === 'jwt expire') {
      return res.status(401).json({
        message: 'refresh token expire'
      });
    }

    res.status(500).json({
      message: error.message,
    });
  }
};


export const profile = async (req, res) => {
  try {
    const id = get('user_id');
    const dataUser = await getProfile(id);
    res.status(200).json({
      message: 'success',
      data: dataUser
    });
  } catch (error) {
    if (error.message === "data not found") {
      return res.status(404).json({
        message: "not found user",
      });
    }

    res.status(500).json({
      message: 'internal server error'
    })
  }
}