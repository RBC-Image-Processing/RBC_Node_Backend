import Router from "express";
import { getImage } from "../controllers/imageController";

const router = Router();


router.get("/:id", getImage);

export default router;
