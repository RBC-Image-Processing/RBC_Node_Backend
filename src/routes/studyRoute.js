import Router from "express";

import { handleFileUpload } from "../middlewares/dicomFileHandler";
import {
  getStudyData,
  getStudies,
  uploadStudy,
} from "../controllers/studyController";

const router = Router();

//TODO Add role updates information

router.get("/:id", getStudyData);

router.get("/", getStudies);
router.post("/upload", handleFileUpload, uploadStudy);

// router.delete("/:id", deletePatient);

export default router;
