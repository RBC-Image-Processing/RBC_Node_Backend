import Router from "express";

import { getStudyData, getStudies } from "../controllers/studyController";

const router = Router();

//TODO Add role updates information

router.get("/:id", getStudyData);

router.get("/", getStudies);

// router.delete("/:id", deletePatient);

export default router;
