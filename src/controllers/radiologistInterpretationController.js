import { RadiologistInterpretation } from "../database/models";

// Create a new interpretation
exports.createInterpretation = async (req, res) => {
  try {
    const { study_id, user_id, diagnosis } = req.body;
    const newInterpretation = await RadiologistInterpretation.create({
      study_id,
      user_id,
      diagnosis,
    });
    res.status(201).send(newInterpretation);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

// Retrieve an interpretation by study ID
exports.getInterpretationByStudyId = async (req, res) => {
  try {
    const { studyId } = req.params;
    const interpretation = await RadiologistInterpretation.findAll({
      where: { study_id: studyId },
    });
    res.send(interpretation);
  } catch (error) {
    res.status(404).send(error.message);
  }
};

// Update an interpretation
exports.updateInterpretation = async (req, res) => {
  try {
    const { interpretationId } = req.params;
    const { diagnosis, timestamp } = req.body;
    const updatedData = {};

    if (diagnosis) updatedData.diagnosis = diagnosis;
    if (timestamp) updatedData.timestamp = timestamp;

    const [updateCount] = await RadiologistInterpretation.update(updatedData, {
      where: { interpretation_id: interpretationId },
    });

    if (updateCount > 0) {
      const updatedInterpretation = await RadiologistInterpretation.findByPk(
        interpretationId
      );
      res.send(updatedInterpretation);
    } else {
      res.status(404).send("Interpretation not found or no changes made.");
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};

// Delete an interpretation
exports.deleteInterpretation = async (req, res) => {
  try {
    const { interpretationId } = req.params;
    const deleted = await RadiologistInterpretation.destroy({
      where: { interpretation_id: interpretationId },
    });
    if (deleted) {
      res.status(204).send("Interpretation deleted");
    } else {
      throw new Error("Interpretation not found");
    }
  } catch (error) {
    res.status(404).send(error.message);
  }
};
