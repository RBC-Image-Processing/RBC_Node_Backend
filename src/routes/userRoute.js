import Router from "express";
import { Roles } from "../utils/roles";

import {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  passwordUpdate,
  SendPasswordUpdateEmail,
} from "../controllers/userController";
import { getAuthorisation } from "../middlewares/requireAuthRoles";

import { routeAuth } from "../middlewares/routeAuth";

const router = Router();

router.post("/", getAuthorisation([Roles.ADMINISTRATOR]), createUser);

router.get("/", getAuthorisation([Roles.ADMINISTRATOR]), getUsers);

router.get(
  "/:userId",
  getAuthorisation([
    Roles.ADMINISTRATOR,
    Roles.NON_SPECIALIST,
    Roles.PHYSICIAN,
    Roles.RADIOLOGIST,
  ]),
  getUser
);

router.put("/:userId", getAuthorisation([Roles.ADMINISTRATOR]), updateUser);

router.delete("/:userId", getAuthorisation([Roles.ADMINISTRATOR]), deleteUser);

router.post("/activate-account-request", SendPasswordUpdateEmail);
router.get("/activate-account", routeAuth);
router.post("/activate-account", routeAuth, passwordUpdate);

export default router;
