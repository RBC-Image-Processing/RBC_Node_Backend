import { ApiService } from "./ApiService";
class AiInterpretationService {
  constructor() {}

  async getIntepretationData(fileData) {
    try {
      const apiService = new ApiService(`${process.env.AI_SERVICE}`);
      const response = await apiService.postFile(
        "/predict_with_interpretation",
        fileData
      );
      return response;
    } catch (error) {
      console.error("Error in getInterpretationData:", error.message);
      return { error: error.message };
    }
  }
}

export default new AiInterpretationService();
