import Router from "express";
import { getImage } from "../controllers/imageController";

const router = Router();

//TODO Add role updates information

router.get("/:id", getImage);

export default router;
