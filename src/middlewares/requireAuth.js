import jwt from "jsonwebtoken";
import { getStandardResponse } from "../utils/standardResponse";

export const requireAuth = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return getStandardResponse(
        req,
        res,
        401,
        "Access token is missing or invalid"
      );
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = decoded;
    next();
  } catch (error) {
    console.error("Authorization error:", error.message);
    return getStandardResponse(req, res, 401, error.message);
  }
};
