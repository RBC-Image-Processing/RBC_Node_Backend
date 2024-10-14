import Router from "express";
import pingRoute from "./pingRoute";
import authRoute from "./authRoute";
import userRoute from "./userRoute";

const router = Router();

router.use("/ping", pingRoute);
router.use("/auth", authRoute);
router.use("/user", userRoute);

export default router;
