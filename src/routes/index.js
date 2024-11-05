import Router from "express";
import pingRoute from "./pingRoute";
import authRoute from "./authRoute";
import userRoute from "./userRoute";
import patientRoute from "./patientRoute";
import studyRoute from "./studyRoute";
import imageRoute from "./imageRoute";

const router = Router();

router.use("/ping", pingRoute);
router.use("/auth", authRoute);
router.use("/user", userRoute);
router.use("/patient", patientRoute);
router.use("/study", studyRoute);
router.use("/image", imageRoute);

export default router;
