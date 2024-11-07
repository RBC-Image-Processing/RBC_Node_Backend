import ApiService from "./ApiService";

class AiIntepretation {
  constructor() {
    this.apiServiceInstance = new ApiService(process.env.AI_SERVICE);
  }

  async getIntepretationData() {
    try {
      const response = await this.apiServiceInstance.get(
        `/predict_with_interpretation`
      );
      return response;
    } catch (error) {
      return error.message;
    }
  }
}

export default new AiIntepretation();
