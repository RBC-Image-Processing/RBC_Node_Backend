import AiInterpretationService from "../services/AiIntepretationService.js"; // Adjust path if necessary
import { getStandardResponse } from "../utils/standardResponse";
import multer from "multer";
import fs from "fs";
import path from "path";

const upload = multer({ dest: "uploads/" });

export const getInterpretation = async (req, res, next) => {
  try {
    upload.single("file")(req, res, async (err) => {
      if (err) {
        return res.status(400).json({
          message: "File upload failed",
          error: err.message,
        });
      }

      console.log("Received file:", req.file);

      // Retrieve the interpretation data
      const interpretationData = await AiInterpretationService.getIntepretationData(req.file);

      // Clean up the temporary file
      fs.unlink(path.resolve(req.file.path), (unlinkErr) => {
        if (unlinkErr) console.error("Error deleting temp file:", unlinkErr);
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
