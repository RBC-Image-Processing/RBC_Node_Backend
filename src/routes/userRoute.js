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

router.post("/", getAuthorisation([Roles.SUPPORT_USER]), createUser);

router.get("/", getAuthorisation([Roles.SUPPORT_USER]), getUsers);

router.get("/:userId", getAuthorisation([Roles.SUPPORT_USER]), getUser);

router.put("/:userId", getAuthorisation([Roles.SUPPORT_USER]), updateUser);

router.delete("/:userId", getAuthorisation([Roles.SUPPORT_USER]), deleteUser);

router.post("/activate-account-request", SendPasswordUpdateEmail);
router.get("/activate-account", routeAuth);
router.post("/activate-account", routeAuth, passwordUpdate);

export default router;
