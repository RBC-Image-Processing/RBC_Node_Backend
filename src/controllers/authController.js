import { checkPassword, hashPassword } from "../utils/authUtil";
import { getStandardResponse } from "../utils/standardResponse";

export const login = async (req, res, next) => {
  try {
    return getStandardResponse(req, res, 200, "Login was successful");
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
    const resetLink = `http://localhost:8000/password-reset?token=${token}`;

    //send verification email
    let message = {
      subject: "Finish Resetting your password: RBC_MidAp Registration",
      verificationLink: resetLink,
    };

    await sendMail(user.fullName, email, message);
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

