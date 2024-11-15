import Router from "express";
import {
  createDoctorComment,
  getDoctorComments,
  updateDoctorComment,
  deleteDoctorComment,
  getDoctorCommentsByDoctorId,
} from "../controllers/doctorCommentController";

const router = Router();

router.post("/", createDoctorComment); // Add a new doctor comment
router.get("/:aiInterpretationId", getDoctorComments); // Get comments by AI interpretation ID
router.put("/:doctorCommentId", updateDoctorComment); // Update a specific doctor comment
router.delete("/:doctorCommentId", deleteDoctorComment); // Delete a specific doctor comment
router.get("/doctor/:userId", getDoctorCommentsByDoctorId); // Get comments by doctor ID

export default router;
