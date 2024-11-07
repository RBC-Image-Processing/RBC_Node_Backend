import { getStandardResponse } from "../utils/standardResponse";
import { getImageFile } from "../services/AiInterpretationService";

export const getInterpretation = async (req, res, next) => {
  try {
    const imageId = req.params.id;
    const dicomBuffer = await getIntepretationData(imageId);

    console.log(dicomBuffer, "the dicom buffer");
    res.set({
      "Content-Type": "application/dicom",
      "Content-Length": dicomBuffer.length,
      "Access-Control-Allow-Origin": "*", // Adjust based on your CORS needs
    });

    return res.send(dicomBuffer);

  } catch (error) {
    next(error);
    console.log(error);
  }
};
