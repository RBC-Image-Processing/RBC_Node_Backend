import ApiService from "./ApiService";

class AiInterpretationService {
  constructor() {}

  async getIntepretationData(data) {
    try {
      const response = await ApiService.post(
        `/predict_with_interpretation`,
        data
      );
      console.log(response, "the response");
      return response;
    } catch (error) {
      return error.message;
    }
  }
}

module.exports = new AiInterpretationService();
