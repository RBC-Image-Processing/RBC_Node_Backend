// import Router from "express";
// import {
//   createDoctorComment,
//   getDoctorComments,
//   updateDoctorComment,
//   deleteDoctorComment,
//   getDoctorCommentsByDoctorId,
//   getDoctorCommentsByStudyId,
//   getAllDoctorComments,
// } from "../controllers/doctorCommentController";

// const router = Router();

// router.post("/", createDoctorComment); // Add a new doctor comment
// router.get("/all", getAllDoctorComments); // Retrieve all the doctor comments in the system
// router.get("/:aiInterpretationId", getDoctorComments); // Get comments by AI interpretation ID
// router.put("/:doctorCommentId", updateDoctorComment); // Update a specific doctor comment
// router.delete("/:doctorCommentId", deleteDoctorComment); // Delete a specific doctor comment
// router.get("/doctor/:userId", getDoctorCommentsByDoctorId); // Get comments by doctor ID
// router.get("/study/:studyId", getDoctorCommentsByStudyId); 


// export default router;

import Router from "express";
import {
  createDoctorComment,
  getDoctorComments,
  updateDoctorComment,
  deleteDoctorComment,
  getDoctorCommentsByDoctorId,
  getDoctorCommentsByStudyId,
  getAllDoctorComments,
} from "../controllers/doctorCommentController";

const router = Router();

router.get("/all", getAllDoctorComments); // Retrieve all the doctor comments in the system
router.post("/", createDoctorComment); // Add a new doctor comment
router.get("/:aiInterpretationId", getDoctorComments); // Get comments by AI interpretation ID
router.put("/:doctorCommentId", updateDoctorComment); // Update a specific doctor comment
router.delete("/:doctorCommentId", deleteDoctorComment); // Delete a specific doctor comment
router.get("/doctor/:userId", getDoctorCommentsByDoctorId); // Get comments by doctor ID
router.get("/study/:studyId", getDoctorCommentsByStudyId); // Get comments by study ID

export default router;
