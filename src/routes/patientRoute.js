import Router from "express";

import { deletePatient, getPatientData, getPatients } from "../controllers/patientController";

const router = Router();


//TODO Add role updates information 

router.get("/:id", getPatientData);

router.get("/", getPatients); 

router.delete("/:id", deletePatient);



export default router;
