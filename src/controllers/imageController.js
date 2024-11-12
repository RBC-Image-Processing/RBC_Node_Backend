import { getStandardResponse } from "../utils/standardResponse";
import { getImageFile } from "../services/ImageService";

export const getImage = async (req, res, next) => {
  try {
    console.log("here 123 noe");
    const imageId = req.params.id;
    const dicomBuffer = await getImageFile(imageId);

    console.log(dicomBuffer, "the dicom buffer");
    res.set({
      "Content-Type": "application/dicom",
      "Content-Length": dicomBuffer.length,
      "Access-Control-Allow-Origin": "*", // Adjust based on your CORS needs
    });

    // Send the buffer directly
    return res.send(dicomBuffer);
    // console.log(response, "the response");
    // return response;
    // return getStandardResponse(
    //   req,
    //   res,
    //   200,
    //   "Image File Retrieved successfully",
    //   imageFile
    // );
  } catch (error) {
    next(error);
    console.log(error);
  }
};
