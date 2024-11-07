import Router from "express";
import pingRoute from "./pingRoute";
import authRoute from "./authRoute";
import userRoute from "./userRoute";
import patientRoute from "./patientRoute";
import studyRoute from "./studyRoute";
import imageRoute from "./imageRoute";
import  interpreterRoute from "./aiInterpretationRoute";

const router = Router();

router.use("/ping", pingRoute);
router.use("/auth", authRoute);
router.use("/user", userRoute);
router.use("/patient", patientRoute);
router.use("/study", studyRoute);
router.use("/image", imageRoute);
router.use("/interpret", interpreterRoute);

export default router;
