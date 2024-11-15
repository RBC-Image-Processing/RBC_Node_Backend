import { DoctorComment, AIInterpretation } from "../database/models";

// Add a new doctor comment
export const createDoctorComment = async (req, res) => {
  try {
    const { aiInterpretationId, userId, rating, comment } = req.body;
    const newComment = await DoctorComment.create({
      aiInterpretationId,
      userId,
      rating,
      comment,
    });
    res.status(201).json({
      message: "Doctor comment created successfully",
      data: newComment,
    });
  } catch (error) {
    console.error("Error creating doctor comment:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};


// Retrieve all the doctor comments in the system
export const getAllDoctorComments = async (req, res) => {
  try {
    const comments = await DoctorComment.findAll();
    res.status(200).json({
      message: "Doctor comments retrieved successfully",
      data: comments,
    });
  } catch (error) {
    console.error("Error retrieving doctor comments:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}


// Retrieve doctor comments based on AI interpretation ID
export const getDoctorComments = async (req, res) => {
  const { aiInterpretationId } = req.params;
  try {
    const comments = await DoctorComment.findAll({
      where: { aiInterpretationId },
    });
    res.status(200).json({
      message: "Doctor comments retrieved successfully",
      data: comments,
    });
  } catch (error) {
    console.error("Error retrieving doctor comments:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Update an existing doctor comment
export const updateDoctorComment = async (req, res) => {
  const { doctorCommentId } = req.params;
  const { rating, comment } = req.body;
  try {
    const [updatedRows, [updatedComment]] = await DoctorComment.update(
      { rating, comment },
      {
        where: { doctorCommentId },
        returning: true,
      }
    );

    if (updatedRows === 0) {
      return res.status(404).json({ message: "Doctor comment not found" });
    }
    res.status(200).json({
      message: "Doctor comment updated successfully",
      data: updatedComment,
    });
  } catch (error) {
    console.error("Error updating doctor comment:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Delete a doctor comment
export const deleteDoctorComment = async (req, res) => {
  const { doctorCommentId } = req.params;
  try {
    const deleted = await DoctorComment.destroy({
      where: { doctorCommentId },
    });

    if (!deleted) {
      return res.status(404).json({ message: "Doctor comment not found" });
    }
    res.status(200).json({ message: "Doctor comment deleted successfully" });
  } catch (error) {
    console.error("Error deleting doctor comment:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Retrieve doctor comments by doctor ID
export const getDoctorCommentsByDoctorId = async (req, res) => {
  const { userId } = req.params;
  try {
    const comments = await DoctorComment.findAll({
      where: { userId },
    });
    res.status(200).json({
      message: "Comments by the doctor retrieved successfully",
      data: comments,
    });
  } catch (error) {
    console.error("Error retrieving comments by doctor:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};


export const getDoctorCommentsByStudyId = async (req, res) => {
  const { studyId } = req.params;
  try {
    const comments = await DoctorComment.findAll({
      include: [
        {
          model: AIInterpretation,
          where: { studyId },
          attributes: ["aiInterpretationId", "studyId", "diagnosis", "confidenceScore"],
        },
      ],
    });

    if (comments.length === 0) {
      return res.status(404).json({ message: "No comments found for this study ID" });
    }

    res.status(200).json({
      message: "Doctor comments retrieved successfully",
      data: comments,
    });
  } catch (error) {
    console.error("Error retrieving doctor comments by study ID:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};