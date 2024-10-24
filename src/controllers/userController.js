import db from "../database/models";
import { User } from "../database/models";
import { assignRole } from "../utils/assignRole";
import {
  createJwtToken,
  generateRandomPassword,
  hashPassword,
} from "../utils/authUtil";
import { sendMail } from "../utils/mailSender";
import { getStandardResponse } from "../utils/standardResponse";

export const getUsers = async (req, res, next) => {
  try {
    //retrieve all the users of the system
    let users = await User.findAll({ attributes: { exclude: ["password"] } });

    if (!users) {
      return getStandardResponse(req, res, 404, "No users found", null);
    }

    return getStandardResponse(req, res, 200, "All users retrieved ", users);
  } catch (error) {
    console.log("Error " + error);
    next(error);
  }
};

export const getUser = async (req, res, next) => {
  try {
    let { userId } = req.params;
    //retrieve all the users of the system
    let singleUser = await User.findOne({
      where: { userId: userId },
      attributes: { exclude: ["password"] },
    });

    if (!singleUser) {
      return getStandardResponse(
        req,
        res,
        404,
        "No user found with given Id",
        null
      );
    }

    return getStandardResponse(
      req,
      res,
      200,
      "User retrieved successfully",
      singleUser
    );
  } catch (error) {
    console.log("Error " + error);
    next(error);
  }
};

export const createUser = async (req, res, next) => {
  try {
    let { email } = req.body;
    // Check if the user already exists
    let userFound = await User.findOne({ where: { email: email } });

    if (userFound) {
      return getStandardResponse(req, res, 200, "User already exists", null);
    }

    let default_pass = { password: generateRandomPassword() };

    let userObj = { ...req.body, ...default_pass };

    console.log(userObj, "user obj");

    //create and return a new user if they does not exist
    let createdUser = await User.create(userObj);

    //assign  role to the created user

    assignRole(createdUser.userId, createdUser.roleId, true);

    const userResponse = createdUser.toJSON();

    // Remove the password from the plain object
    delete userResponse.password;

    return getStandardResponse(req, res, 201, "User created", userResponse);
  } catch (error) {
    console.log("Error " + error);
    next(error);
  }
};

export const updateUser = async (req, res, next) => {
  const transaction = await db.sequelize.transaction();
  try {
    const { userId } = req.params;
    const { roleId, ...otherUserDetails } = req.body;

    // Check if the user exists
    let userFound = await User.findOne({ where: { userId }, transaction });

    if (!userFound) {
      await transaction.rollback();
      return getStandardResponse(req, res, 404, "User not found", null);
    }

    // If the roleId is different, include it in the update and assign the new role
    if (roleId && roleId !== userFound.roleId) {
      otherUserDetails.roleId = roleId;
      assignRole(userId, roleId); // Ensure this function is properly defined
    }

    // Update user details (including roleId if applicable)
    await userFound.update({ ...otherUserDetails }, { transaction });

    const userResponse = userFound.toJSON();
    delete userResponse.password;

    await transaction.commit();
    return getStandardResponse(
      req,
      res,
      200,
      "User updated successfully",
      userResponse
    );
  } catch (error) {
    await transaction.rollback();
    console.error("Error: " + error);
    next(error);
  }
};

export const deleteUser = async (req, res, next) => {
  try {
    let { userId } = req.params;
    //retrieve all the users of the system
    let userFound = await User.findOne({ where: { userId: userId } });

    if (userFound) {
      await userFound.destroy();
    }

    return getStandardResponse(req, res, 200, "User deleted");
  } catch (error) {
    console.log("Error " + error);
    next(error);
  }
};

export const SendPasswordUpdateEmail = async (req, res, next) => {
  let { email } = req.body;

  try {
    //check if the person is in the database
    let userFound = await User.findOne({
      where: { email: email },
    });

    if (!userFound) {
      return getStandardResponse(req, res, 404, "User not found", null);
    }

    //create a reset  link
    let token = await createJwtToken(userFound.userId, userFound.roleId);

    //TODO Update the stuff here
    const resetLink = `https://rbc-frontend.onrender.com/activate?token=${token}`;

    //send verification email
    let message = {
      subject: "Finish Creating your Account: RBC_MidAp Registration",
      verificationLink: resetLink,
    };

    sendMail(userFound.fullName, email, message, true);
    return getStandardResponse(req, res, 200, "Email was sent");
  } catch (error) {
    next(error);
  }
};

export const passwordUpdate = async (req, res, next) => {
  const { newPassword } = req.body;

  try {
    if (newPassword.length < 6) {
      return getStandardResponse(
        req,
        res,
        404,
        "Password Must be 6 characters long",
        null
      );
    }

    //verify the token
    let decoded = req.user;

    //check if the user is in the database
    let userFound = await User.findOne({
      where: { userId: decoded.userId },
    });

    if (!userFound) {
      return getStandardResponse(req, res, 404, "User not found", null);
    }

    //hash the password
    let hashedPassword = await hashPassword(newPassword.trim());

    //update the password in the database

    await userFound.update({ password: hashedPassword, isActive: true });

    return getStandardResponse(
      req,
      res,
      200,
      "Password  was added successfully",
      null
    );
  } catch (error) {
    next(error);
  }
};
