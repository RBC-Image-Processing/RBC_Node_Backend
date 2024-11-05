import { getStandardResponse } from "../utils/standardResponse";
import {
  getPatientList,
  getPatientInfo,
  deletePatientById,
} from "../services/PatientService";

export const getPatientData = async (req, res, next) => {
  try {
    const patientId = req.params.id;
    const patientInfo = await getPatientInfo(patientId);
    return getStandardResponse(
      req,
      res,
      200,
      "Patients Retrieved successfully",
      patientInfo
    );
  } catch (error) {
    next(error);
    console.log(error);
  }
};

export const getPatients = async (req, res, next) => {
  try {
    const patients = await getPatientList();

    return getStandardResponse(
      req,
      res,
      200,
      "Patient Retrieved successfully",
      patients
    );
  } catch (error) {
    console.log(error);
    next(error);
  }
};

//api call for deleting the patient using patient id 
export const deletePatient = async (req, res, next) => {
  try {
    const patientId = req.params.id;
    const response = await deletePatientById(patientId);
    return getStandardResponse(req, res, 200, "Patient was deleted", response);
  } catch (error) {
    console.log(error);
    next(error);
  }
};
