import ApiService from "./ApiService";

class AiInterpretationService {
  constructor() {}

  async getIntepretationData(fileData) {
    try {
      const response = await ApiService.postFile(
        `/predict_with_interpretation`,
        fileData
      );

      return response;
    } catch (error) {
      return error.message;
    }
  }
}

module.exports = new AiInterpretationService();
