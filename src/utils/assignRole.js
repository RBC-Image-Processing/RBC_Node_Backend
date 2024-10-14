import { User, Personnel } from "../database/models";
import { createJwtToken } from "./authUtil";
import { sendMail } from "./mailSender";
import { getStandardResponse } from "./standardResponse";

//Used when creating anew user
export const assignRole = async (userId, roleId, isReg) => {
  try {
    const user = await User.findByPk(userId);

    if (!isReg) {
      //get user information from provided id

      if (!user) {
        return getStandardResponse(req, res, 404, "User not found", null);
      }

      //assign the user Role
      user.roleId = roleId;
      await user.save();
    }

    //create a reset  link
    let token = await createJwtToken(user.userId, user.roleId);

    //TODO Update the stuff here
    const resetLink = `http://localhost:8000/account?token=${token}`;

    //send verification email
    let message = {
      subject: "Finish Registration of  your Account: RBC_MidAp Registration",
      verificationLink: resetLink,
    };

    //send verification email to the created user
    await sendMail(user.fullName, user.email, message, isReg);

    return user;
  } catch (error) {
    console.error("Error assigning roles to user:", error);
    throw error;
  }
};
