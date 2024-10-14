import { getStandardResponse } from "../utils/standardResponse";

export const pingController = async (req, res) => {
  return getStandardResponse(req, res, 200, "Welcome to RBCMidAp");
};
