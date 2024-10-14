import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import crypto from "crypto";

export const generateRandomPassword = () => {
  return crypto.randomBytes(8).toString("hex");
};

export const hashPassword = async (password) => {
  try {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
  } catch (error) {}
};

export const checkPassword = async (password, hashPassword) => {
  try {
    return await bcrypt.compare(password, hashPassword);
  } catch (error) {}
};

export const createJwtToken = async (userId, role) => {
  try {
    const payLoad = {
      userId,
      role,
    };

    return jwt.sign(payLoad, process.env.JWT_SECRET_KEY);
  } catch (error) {
    console.log(error);
  }
};
