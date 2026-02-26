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
  //LAST TRUE
  async getStudyList(limit = 10, offset = 0) {
    try {
      // Fetch all studies
      const studiesResponse = await ApiService.get("/studies");

      console.log(`[StudyService] Fetching studies with limit=${limit}, offset=${offset}`);
      console.log(`[StudyService] Total studies in Orthanc: ${studiesResponse.length}`);

      // Calculate the end index for batching
      // If limit is -1, return all studies (no pagination)
      const studiesBatch = limit === -1
        ? studiesResponse
        : studiesResponse.slice(offset, offset + limit);

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
          const studyDate = MainDicomTags.StudyDate;

          // Fetch series information for each study
          const seriesDetails = await Promise.all(
            Series.map(async (seriesId) => {
              // Get the details for each series
              const seriesResponse = await ApiService.get(
                `/series/${seriesId}`
              );
              const { MainDicomTags: seriesTags, Instances } = seriesResponse;

              // Only include series with Modality as XR, CR, MR, or DX
              const allowedModalities = ["CR", "XR", "MR", "DX"];
              const Modality = allowedModalities.includes(seriesTags.Modality)
                ? seriesTags.Modality
                : null;
              if (!Modality) return null; // Skip if Modality is not in allowed list

              // Fetch only a subset of instances based on the limit
              const instanceFiles = await Promise.all(
                Instances.slice(0, limit).map(async (instanceId) => {
                  const instanceResponse = await ApiService.get(
                    `/instances/${instanceId}`
                  );
                  return instanceResponse.ID; // Collect FileUuid for DICOM file
                })
              );

              // Return structured series info with description
              return {
                Modality,
                Instances: instanceFiles,
                SeriesDescription: seriesTags.SeriesDescription || null,
                BodyPartExamined: seriesTags.BodyPartExamined || null
              };
            })
          );

          // Filter out null values (series that didn't match Modality criteria)
          const validSeries = seriesDetails.filter(
            (s) => s !== null && s !== undefined
          );

          if (validSeries.length > 0) {
            // Build a meaningful description
            let description = MainDicomTags.StudyDescription;

            if (!description || description.trim() === "") {
              // Try to use series description
              const seriesDesc = validSeries[0].SeriesDescription;
              const bodyPart = validSeries[0].BodyPartExamined;
              const modality = validSeries[0].Modality;

              if (seriesDesc && seriesDesc.trim() !== "") {
                description = seriesDesc;
              } else if (bodyPart && bodyPart.trim() !== "") {
                // Build description from body part and modality
                const modalityName = {
                  'CR': 'Computed Radiography',
                  'DX': 'Digital Radiography',
                  'XR': 'X-Ray',
                  'MR': 'MRI'
                }[modality] || modality;
                description = `${bodyPart} ${modalityName}`;
              } else {
                // Generic description based on modality
                const modalityDesc = {
                  'CR': 'Chest X-Ray',
                  'DX': 'Chest X-Ray',
                  'XR': 'X-Ray Study',
                  'MR': 'MRI Study'
                }[modality] || 'Medical Imaging Study';
                description = modalityDesc;
              }
            }

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

      console.log(`[StudyService] Returning ${filteredStudyList.length} studies to frontend`);

      return filteredStudyList;
    } catch (error) {
      console.error("Error retrieving study list:", error.message);
      return { error: error.message };
    }
  }
}

module.exports = new StudyService();
