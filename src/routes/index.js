import Router from "express";
import pingRoutes from "./ping";

const router = Router();

router.use("/ping", pingRoutes);

export default router;
