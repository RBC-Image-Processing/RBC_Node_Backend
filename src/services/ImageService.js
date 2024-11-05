import pacsService from "./PacsService";

class ImageService {
  constructor() {}

  //api call to get the patient information
  async getImageFile(instanceId) {
    try {
      console.log(instanceId, "the instance id");
      const response = await pacsService.getFile(
        `/instances/${instanceId}/file`
      );

      return response;
    } catch (error) {
      return error.message;
    }
  }
}

module.exports = new ImageService();
