import { getStandardResponse } from "../utils/standardResponse";

export const userController = async (req, res) => {
  return getStandardResponse(req, res, 200, "userController");
};
