import express from "express";
const router = express.Router();
import {
  createInterpretation,
  getInterpretationByStudyId,
  updateInterpretation,
  deleteInterpretation,
} from "../controllers/radiologistInterpretationController.js";

router.post("/", createInterpretation);
router.get("/study/:studyId", getInterpretationByStudyId);
router.put("/:interpretationId", updateInterpretation);
router.delete("/:interpretationId", deleteInterpretation);

export default router;
