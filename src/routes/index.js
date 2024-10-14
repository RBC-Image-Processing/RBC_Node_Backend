import Router from "express";
import pingRoute from "./pingRoute";

const router = Router();

router.use("/ping", pingRoute);

export default router;
