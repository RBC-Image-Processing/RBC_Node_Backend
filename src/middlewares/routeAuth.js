import jwt from "jsonwebtoken";
import { getStandardResponse } from "../utils/standardResponse";

export const routeAuth = (req, res, next) => {
  //Checks the route content to see if the token is contained in the route
  try {
    const token = req.query.token;
    if (!token) {
      return getStandardResponse(
        req,
        res,
        401,
        "Access token is missing or invalid"
      );
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    console.error("Authorization error:", error.message);
    return getStandardResponse(req, res, 401, error.message);
  }
};
