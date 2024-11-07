import { getIntepretationData } from "../services/AiIntepretationService";
import { getStandardResponse } from "../utils/standardResponse";
const multer = require("multer");
const upload = multer({ dest: "uploads/" }); // Specifies the folder to store the uploaded files

export const getInterpretation = async (req, res, next) => {
  try {
    // Middleware to handle the file upload before getting interpretation data
    upload.single("file")(req, res, async (err) => {
      if (err) {
        // If multer encounters an error during the file upload
        return res.status(400).json({
          message: "File upload failed",
          error: err.message,
        });
      }

      // At this point, req.file contains the uploaded file data
      console.log("Received file:", req.file);

      // Retrieve the interpretation data
      const interpretationData = await getIntepretationData(req.file);

      // Set response content type (optional)
      res.set({
        "Content-Type": "application/json", // Adjusted to JSON for API response
      });

      return getStandardResponse(
        req,
        res,
        200,
        "Interpretation Retrieved successfully",
        interpretationData
      );
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
