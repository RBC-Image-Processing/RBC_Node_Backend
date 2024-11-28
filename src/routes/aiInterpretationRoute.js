import Router from "express";
import { getInterpretation, createAiInterpretation, createInterpretationRecursive } from "../controllers/aiInterpretationController";

const router = Router();

router.post("/", getInterpretation);
router.post("/create", createAiInterpretation);
router.post("/create_recursive", createInterpretationRecursive);

export default router;
