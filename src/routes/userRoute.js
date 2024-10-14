import Router from "express";
import { Roles } from "../utils/roles";

import {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
} from "../controllers/userController";
import { getAuthorisation } from "../middlewares/requireAuthRoles";
import { passwordReset } from "../controllers/authController";
import { routeAuth } from "../middlewares/routeAuth";

const router = Router();

router.post("/", getAuthorisation([Roles.SUPPORT_USER]), createUser);

router.get("/", getAuthorisation([Roles.SUPPORT_USER]), getUsers);

router.get("/:userId", getAuthorisation([Roles.SUPPORT_USER]), getUser);

router.put("/:userId", getAuthorisation([Roles.SUPPORT_USER]), updateUser);

router.delete("/:userId", getAuthorisation([Roles.SUPPORT_USER]), deleteUser);

router.get("/account", routeAuth);
router.post("/account", routeAuth, passwordReset);

export default router;
