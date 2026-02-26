import { ApiService } from "./ApiService";
import { AIInterpretation } from "../database/models";

class AiInterpretationService {
  constructor() {}

  async getIntepretationData(fileData) {
    try {
      const apiService = new ApiService(`${process.env.AI_SERVICE}`);
      const response = await apiService.postFile(
        "/predict_with_interpretation_groq",
        fileData
      );
      return response;
    } catch (error) {
      console.error("Error in getInterpretationData:", error.message);
      return { error: error.message };
    }
  }

   async createInterpretation(data) {
    const { studyId, diagnosis, confidenceScore } = data;

    try {
      const newInterpretation = await AIInterpretation.create({
        studyId,
        diagnosis,
        confidenceScore,
        timestamp: new Date(), // Uses the current date and time
      });

      return newInterpretation;
    } catch (error) {
      console.error("Error creating AI interpretation:", error);
      throw error;
    }
  }
}

export default new AiInterpretationService();
