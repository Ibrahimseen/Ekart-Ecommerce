import jwt from "jsonwebtoken";
import { User } from "../models/userModel.js";

export const IsAuthenticated = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(400).json({
        success: false,
        message: "authorization token is missing or invalid",
      });
    }

    const token = authHeader.split(" ")[1];

    let decoded;
    try {
      decoded = jwt.verify(token, process.env.SECRET_KEY);
    } catch (error) {
      if (error.name === "TokenExpiredError") {
        res.status(400).json({
          success: false,
          message: "the registration token has expired",
        });
      }
      return res.status(400).json({
        success: false,
        message: "Access token is missing or invalid ",
      });
    }

    const user = await User.findById(decoded.id);
    if (!user) {
      res.status(400).json({
        success: false,
        message: "User not found",
      });
    }
    req.user = user
    req.id = user._id;
    next();
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const isAdmin = async (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    next();
  } else {
    return res.status(403).json({
      message: "access denied: Admin only",
    });
  }
};
