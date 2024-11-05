import { getStandardResponse } from "../utils/standardResponse";
import { getStudyInfo, getStudyList } from "../services/StudyService";

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
