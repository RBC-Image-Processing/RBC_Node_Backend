import { getStandardResponse } from "../utils/standardResponse";
import { getStudyInfo, getStudyList } from "../services/StudyService";
import uploadService from "../services/UploadService";

export const getStudyData = async (req, res, next) => {
  try {
    const studyId = req.params.id;
    const studyInfo = await getStudyInfo(studyId);
    return getStandardResponse(
      req,
      res,
      200,
      "Study Retrieved successfully",
      studyInfo
    );
  } catch (error) {
    next(error);
    console.log(error);
  }
};

export const getStudies = async (req, res, next) => {
  try {
    const studies = await getStudyList();

    return getStandardResponse(
      req,
      res,
      200,
      "Studies Retrieved successfully",
      studies
    );
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const uploadStudy = async (req, res, next) => {
  try {
    // validate request body
    const { patientId, studyDate, description, modality } = req.body;

    if (!patientId || !studyDate || !description || !modality) {
      return getStandardResponse(req, res, 400, "Missing required fields", {
        required: ["patientId", "studyDate", "description", "modality"],
      });
    }

    // Validate files presence
    if (!req.files || req.files.length === 0) {
      return getStandardResponse(req, res, 400, "No files uploaded", {
        error: "At least one DICOM file is required",
      });
    }

    // Process the upload using the upload service
    const result = await uploadService.uploadImageStudy(req.files, {
      patientId,
      studyDate,
      description,
      modality,
    });

    return getStandardResponse(
      req,
      res,
      201,
      "Study uploaded successfully",
      result
    );
  } catch (error) {
    console.error("Upload error:", error);

    // Handle specific error types
    if (error.message.includes("Failed to create study")) {
      return getStandardResponse(req, res, 500, "Failed to create study", {
        error: error.message,
      });
    }

    if (error.message.includes("Failed to create series")) {
      return getStandardResponse(req, res, 500, "Failed to create series", {
        error: error.message,
      });
    }

    if (error.message.includes("Failed to upload file")) {
      return getStandardResponse(req, res, 500, "Failed to upload files", {
        error: error.message,
      });
    }

    // Generic error handler
    next(error);
  }
};

// //api call for deleting the study using study id
// export const deleteStudy = async (req, res, next) => {
//   try {
//     const studyId = req.params.id;
//     const response = await deleteStudyById(studyId);
//     return getStandardResponse(req, res, 200, "Study was deleted", response);
//   } catch (error) {
//     console.log(error);
//     next(error);
//   }
// };
