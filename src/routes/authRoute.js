import Router from "express";
import {
  changePassword,
  login,
  logout,
  SendPasswordResetEmail,
  passwordReset,
} from "../controllers/authController";

import { routeAuth } from "../middlewares/routeAuth";
import { getAuthorisation } from "../middlewares/requireAuthRoles";
import { Roles } from "../utils/roles";
import { requireAuth } from "../middlewares/requireAuth";

const router = Router();

router.post("/login", login);
router.post("/change-password", requireAuth, changePassword);
router.post("/request-password-reset", SendPasswordResetEmail);
router.get("/password-reset", routeAuth);
router.post("/password-reset", routeAuth, passwordReset);
// router.post(
//   "/password-reset-id",
//   getAuthorisation([Roles.SUPPORT_USER]),
//   passwordResetId
// );
router.get("logout", logout);

export default router;
