import jwt from "jsonwebtoken";
import { getStandardResponse } from "../utils/standardResponse";
import { User } from "../database/models";

// Assuming you have getStandardResponse function defined elsewhere

export const getAuthorisation = (requiredRoles) => async (req, res, next) => {
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

    //counteract with the stored user information to check if the user really has access  as claimed
    const user = await User.findOne({ where: { userId: payload.userId } });

    if (!user) {
      return getStandardResponse(req, res, 401, "User not found");
    }

    //check if the role shared from the api belong to the user
    if (user.roleId !== payload.role) {
      return getStandardResponse(
        req,
        res,
        401,
        "User role does not match the role shared"
      );
    }

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
