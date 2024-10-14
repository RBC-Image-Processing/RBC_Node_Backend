import { User, Personnel } from "../database/models";
import { sendMail } from "./mailSender";
import { getStandardResponse } from "./standardResponse";

//Used when creating anew user
export const assignRole = async (userId, defaultPassword, roleId) => {
  try {
    //get user information from provided id
    const user = await User.findByPk(userId);

    if (!user) {
      return getStandardResponse(req, res, 404, "User not found", null);
    }

    //assign the user Role
    user.roleId = roleId;
    await user.save();

    let message = {
      subject: "Welcome to RBC_MidAp",
      defaultPassword: defaultPassword,
    };

    //send verification email to the created user
    await sendMail(user.fullName, user.email, message, true);

    return user;
  } catch (error) {
    console.error("Error assigning roles to user:", error);
    next(error);
    throw error;
  }
};
