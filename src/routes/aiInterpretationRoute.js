import Router from "express";
import { getInterpretation } from "../controllers/aiInterpretationController";

const router = Router();

router.get("/", getInterpretation);

export default router;
