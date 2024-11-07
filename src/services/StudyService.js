import ApiService from "./ApiService";
class StudyService {
  constructor() {}

  //api call to get study information
  async getStudyInfo(studyId) {
    try {
      const response = await ApiService.get(`/studies/${studyId}`);
      return response;
    } catch (error) {
      return error.message;
    }
  }

  async getStudyList(limit = 10, offset = 0) {
    try {
      // Fetch all studies
      const studiesResponse = await ApiService.get("/studies");

      // Calculate the end index for batching
      const endIndex = offset + limit;
      const studiesBatch = studiesResponse.slice(offset, endIndex);

      // Iterate over each study in the batch and fetch series and instance details
      const studyList = await Promise.all(
        studiesBatch.map(async (studyID) => {
          const studyInfo = await ApiService.get(`/studies/${studyID}`);
          const {
            PatientMainDicomTags,
            ID: studyId,
            MainDicomTags,
            Series,
          } = studyInfo;

          console.log(studyInfo, "theee study info");

          // Extract patient and study information
          const patientId = PatientMainDicomTags.PatientID;
          const patientName = PatientMainDicomTags.PatientName;
          const description = MainDicomTags.StudyDescription
            ? MainDicomTags.StudyDescription
            : "Description";
          const studyDate = MainDicomTags.StudyDate;

          // Fetch series information for each study
          const seriesDetails = await Promise.all(
            Series.map(async (seriesId) => {
              // Get the details for each series
              const seriesResponse = await ApiService.get(
                `/series/${seriesId}`
              );
              const { MainDicomTags: seriesTags, Instances } = seriesResponse;

              // Only include series with Modality as XR or MR
              const Modality =
                seriesTags.Modality === "CR" ||
                seriesTags.Modality === "XR" ||
                seriesTags.Modality === "MR"
                  ? seriesTags.Modality
                  : null;
              if (!Modality) return null; // Skip if Modality is not XR or MR

              // Fetch only a subset of instances based on the limit
              const instanceFiles = await Promise.all(
                Instances.slice(0, limit).map(async (instanceId) => {
                  const instanceResponse = await ApiService.get(
                    `/instances/${instanceId}`
                  );
                  return instanceResponse.ID; // Collect FileUuid for DICOM file
                })
              );

              // Return structured series info
              return { Modality, Instances: instanceFiles };
            })
          );

          // Filter out null values (series that didn't match Modality criteria)
          const validSeries = seriesDetails.filter(
            (s) => s !== null && s !== undefined
          );

          if (validSeries.length > 0) {
            // Return the aggregated study object
            return {
              patientId,
              patientName,
              studyId,
              description,
              studyDate,
              modality: validSeries[0].Modality,
              instances: validSeries.flatMap((s) => s.Instances), // Flatten the instances arrays
            };
          } else {
            return null;
          }
        })
      );

      // Filter out null values from the final list and log the aggregated data
      const filteredStudyList = studyList.filter((study) => study !== null);

      return filteredStudyList;
    } catch (error) {
      console.error("Error retrieving study list:", error.message);
      return { error: error.message };
    }
  }
}

module.exports = new StudyService();
