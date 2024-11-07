import ApiService from "./ApiService";

class PatientService {
  constructor() {}

  //api call to get the patient information
  async getPatientInfo(patientId) {
    try {
      const response = await ApiService.get(`/patients/${patientId}`);
      return response;
    } catch (error) {
      return error.message;
    }
  }

  //api call to get all the patients  in the database
  async getPatientList() {
    try {
      // Get the list of patients
      const response = await ApiService.get("/patients");

      // Check if the response has data and iterate over each patient to retrieve detailed info
      const patientList = await Promise.all(
        response.map(async (patientId) => {
          // Make an API call for each patient to get detailed information
          const patientInfo = await ApiService.get(`/patients/${patientId}`);
          // Merge or aggregate patient basic info with detailed info
          return { patientInfo };
        })
      );

      console.log("Aggregated patient data:", patientList);
      return patientList;
    } catch (error) {
      console.error("Error retrieving patient list:", error.message);
      return { error: error.message };
    }
  }

  //api call to delete a patient

  async deletePatientById(patientId) {
    try {
      const response = await ApiService.delete(`/patients/${patientId}`);
      return response;
    } catch (error) {
      return error.message;
    }
  }

  //api call to update the patient

  async updatePatientById(patientId) {
    try {
      const response = await ApiService.put(`/patients/${patientId}`);
      return response;
    } catch (error) {
      return error.message;
    }
  }
}

module.exports = new PatientService();
