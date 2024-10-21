import { User, UserRole } from "../database/models";
import { checkPassword, createJwtToken, hashPassword } from "../utils/authUtil";
import { sendMail } from "../utils/mailSender";
import { getStandardResponse } from "../utils/standardResponse";

export const login = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    //check if the provided email is in the database
    let userFound = await User.findOne({
      where: { email: email },
    });
    if (!userFound) {
      return getStandardResponse(
        req,
        res,
        404,
        "Invalid Email or Password",
        null
      );
    }

    //compare the given password and the password in the database
    let passwordMatch = await checkPassword(
      password.trim(),
      userFound.password
    );

    if (!passwordMatch) {
      return getStandardResponse(
        req,
        res,
        404,
        "Invalid Email or Password",
        null
      );
    }

    //create a token for the user
    let token = await createJwtToken(userFound.userId, userFound.roleId);

    return getStandardResponse(req, res, 200, "Login successful", {
      token: token,
      email: userFound.email,
      fullName: userFound.fullName,
      roleId: userFound.roleId,
    });
  } catch (error) {
    console.log("Error " + error);
    next(error);
  }
};

export const changePassword = async (req, res, next) => {
  const { oldPassword, newPassword } = req.body;

  try {
    //check if the password is correct
    let userId = req.user.userId;

    let userFound = await User.findOne({
      where: { userId: userId },
    });

    //If the user was not found
    if (!userFound) {
      return getStandardResponse(req, res, 404, "User not found", null);
    }

    //compare the given password against the password in the database

    let passwordMatch = await checkPassword(
      oldPassword.trim(),
      userFound.password
    );

    if (!passwordMatch) {
      return getStandardResponse(req, res, 401, "Invalid Password", null);
    }
    //hash the password
    let hashedPassword = await hashPassword(newPassword);

    //update the password in the database
    userFound.password = hashedPassword;
    userFound.save();
    return getStandardResponse(req, res, 200, "Password changed", null);
  } catch (error) {
    next(error);
  }
};

export const SendPasswordResetEmail = async (req, res, next) => {
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
    const resetLink = `https://rbc-frontend.onrender.com/reset-password?token=${token}`;

    //send verification email
    let message = {
      subject: "Finish Resetting your password: RBC_MidAp Registration",
      verificationLink: resetLink,
    };

    sendMail(userFound.fullName, email, message, false);
    return getStandardResponse(req, res, 200, "Email was sent");
  } catch (error) {
    next(error);
  }
};

export const passwordReset = async (req, res, next) => {
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

    await userFound.update({ password: hashedPassword });

    return getStandardResponse(
      req,
      res,
      200,
      "Password Reset was successful",
      null
    );
  } catch (error) {
    next(error);
  }
};

export const logout = async (req, res) => {
  return getStandardResponse(req, res, 200, "Logout successful", null);
};
