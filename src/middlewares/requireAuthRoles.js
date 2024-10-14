import jwt from "jsonwebtoken";
import { getStandardResponse } from "../utils/standardResponse";

// Assuming you have getStandardResponse function defined elsewhere

export const getAuthorisation = (requiredRoles) => (req, res, next) => {
  try {
    // Acquire the token from the headers
    const token = req.headers.authorization?.split(" ")[1];

    // Check if the token is missing or invalid
    if (!token) {
      return getStandardResponse(
        req,
        res,
        401,
        "Access token is missing or invalid"
      );
    }

    // Verify the token and acquire the payload
    const payload = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = payload;

    // Checks if the role provided through the token is not authorized for the path
    if (requiredRoles && !requiredRoles.includes(req.user.role)) {
      return getStandardResponse(
        req,
        res,
        403,
        "Forbidden: You do not have the required role"
      );
    }

    // Allow the user to continue to the next middleware or route handler
    next();
  } catch (error) {
    console.error("Authorization error:", error.message);

    return getStandardResponse(req, res, 401, error);
  }
};
