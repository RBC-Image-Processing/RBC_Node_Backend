import { RadiologistInterpretation } from "../database/models";
import { getStandardResponse } from "../utils/standardResponse";

// Create a new interpretation
export const createInterpretation = async (req, res, next) => {
  try {
    const { study_id, user_id, diagnosis } = req.body;
    const newInterpretation = await RadiologistInterpretation.create({
      study_id,
      user_id,
      diagnosis,
    });
    return getStandardResponse(req, res, 201, "Interpretation created successfully", newInterpretation);
  } catch (error) {
    console.error("Error: " + error);
    next(error);
  }
};

// Retrieve an interpretation by study ID
export const getInterpretationByStudyId = async (req, res, next) => {
  try {
    const { studyId } = req.params;
    const interpretation = await RadiologistInterpretation.findAll({
      where: { study_id: studyId },
    });
    if (!interpretation.length) {
      return getStandardResponse(req, res, 404, "No interpretation found for the given study ID", null);
    }
    return getStandardResponse(req, res, 200, "Interpretation retrieved successfully", interpretation);
  } catch (error) {
    console.error("Error: " + error);
    next(error);
  }
};

// Update an interpretation
export const updateInterpretation = async (req, res, next) => {
  try {
    const { interpretationId } = req.params;
    const { diagnosis } = req.body;
    const updatedData = {};

    if (diagnosis) updatedData.diagnosis = diagnosis;
    updatedData.timestamp = new Date();

    const [updateCount] = await RadiologistInterpretation.update(updatedData, {
      where: { interpretation_id: interpretationId },
    });

    if (updateCount === 0) {
      return getStandardResponse(req, res, 404, "No interpretation found or no changes made", null);
    }

    const updatedInterpretation = await RadiologistInterpretation.findByPk(interpretationId);
    return getStandardResponse(req, res, 200, "Interpretation updated successfully", updatedInterpretation);
  } catch (error) {
    console.error("Error: " + error);
    next(error);
  }
};

// Delete an interpretation
export const deleteInterpretation = async (req, res, next) => {
  try {
    const { interpretationId } = req.params;
    const deleted = await RadiologistInterpretation.destroy({
      where: { interpretation_id: interpretationId },
    });
    if (deleted === 0) {
      return getStandardResponse(req, res, 404, "Interpretation not found", null);
    }
    return getStandardResponse(req, res, 204, "Interpretation deleted successfully");
  } catch (error) {
    console.error("Error: " + error);
    next(error);
  }
};