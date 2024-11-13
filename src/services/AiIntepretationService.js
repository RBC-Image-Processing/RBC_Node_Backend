import ApiService from "./ApiService";
import fs from "fs";
import path from "path";

class AiInterpretationService {
  constructor() {}

  async getIntepretationData(fileData) {
    try {
      const response = await ApiService.postFile("/predict_with_interpretation", fileData);
      return response;
    } catch (error) {
      console.error("Error in getInterpretationData:", error.message);
      return { error: error.message };
    }
  }
}

export default new AiInterpretationService();
