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

export const createAiInterpretation = async (req, res, next) => {
  try {
    const { studyId, diagnosis, confidenceScore } = req.body;

    if (!studyId) {
      return res.status(400).json({ message: "studyId is required" });
    }

    // Use the service to create a new AI Interpretation
    const newInterpretation = await AiInterpretationService.createInterpretation({
      studyId,
      diagnosis,
      confidenceScore,
    });

    return getStandardResponse(
      req,
      res,
      201,
      "AI Interpretation created successfully",
      newInterpretation
    );
  } catch (error) {
    console.error("Error creating AI Interpretation:", error);
    next(error);
  }
};


export const createInterpretationRecursive = async (req, res, next) => {
  try {
    upload.single("file")(req, res, async (err) => {
      if (err) {
        return res.status(400).json({
          message: "File upload failed",
          error: err.message,
        });
      }

      // Retrieve interpretation data using the file
      const interpretationData = await AiInterpretationService.getIntepretationData(req.file);

      if (!interpretationData || !interpretationData.prediction || !interpretationData.confidence) {
        return res.status(500).json({ message: "Failed to retrieve interpretation data" });
      }

      // Determine the diagnosis based on the prediction value
      const diagnosis = interpretationData.prediction === "PNEUMONIA"
        ? "Pneumonia detected"
        : "No pneumonia detected";

      // Create a new AI Interpretation record using the retrieved data and studyId from the request body
      const newInterpretation = await AiInterpretationService.createInterpretation({
        studyId: req.body.studyId, // Ensuring studyId is taken from req.body
        diagnosis,
        confidenceScore: interpretationData.confidence,
      });

      // Clean up the temporary file
      fs.unlink(path.resolve(req.file.path), (unlinkErr) => {
        if (unlinkErr) console.error("Error deleting temp file:", unlinkErr);
      });

      return getStandardResponse(
        req,
        res,
        201,
        "AI Interpretation created successfully",
        newInterpretation
      );
    });
  } catch (error) {
    console.error("Error creating AI Interpretation recursively:", error);
    next(error);
  }
};