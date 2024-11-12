// UploadService.js
import ApiService from "./ApiService";

class UploadService {
  constructor() {}

  /**
   * Main method to handle study upload with proper series organization
   */
  async uploadImageStudy(files, metadata) {
    try {
      console.log(`Starting upload of ${files.length} files`);
      console.log("Metadata:", metadata);

      // Upload first instance to create or get existing study
      const firstUpload = await this.uploadInstance(files[0]);
      console.log("First instance processed:", firstUpload);

      if (!firstUpload.studyId) {
        throw new Error("Failed to get study ID from first instance");
      }

      const studyId = firstUpload.studyId;
      console.log("Using study ID:", studyId);

      // Upload remaining files
      const remainingFiles = files.slice(1);
      if (remainingFiles.length > 0) {
        console.log(`Processing remaining ${remainingFiles.length} files...`);

        // Upload remaining files in parallel
        const uploadPromises = remainingFiles.map(async (file) => {
          try {
            const result = await this.uploadInstance(file);

            // Only try to associate if it's a new instance or belongs to a different study
            if (result.isNew || result.studyId !== studyId) {
              console.log(
                `Associating instance ${result.instanceId} with study ${studyId}`
              );
              await this.associateInstanceWithStudy(result.instanceId, studyId);
            } else {
              console.log(
                `Instance ${result.instanceId} already associated with study ${studyId}`
              );
            }

            return result.instanceId;
          } catch (error) {
            console.error(`Error processing file ${file.originalname}:`, error);
            throw error;
          }
        });

        await Promise.all(uploadPromises);
        console.log("All remaining files processed successfully");
      }

      // Update study metadata
      //   await this.updateStudyMetadata(studyId, metadata);
      //   console.log("Study metadata updated");

      // Return final study structure
      const finalStudy = await this.getStudyStructure(studyId);
      console.log("Final study structure:", finalStudy);

      return finalStudy;
    } catch (error) {
      console.error("Study upload error:", error);
      throw new Error(`Failed to upload study: ${error.message}`);
    }
  }

  /**
   * Uploads a single DICOM instance with better error handling
   */
  async uploadInstance(file) {
    try {
      console.log("Preparing to upload instance:", {
        name: file.originalname,
        size: file.size,
        mimetype: file.mimetype,
      });

      const response = await ApiService.post("/instances", file.buffer, {
        headers: {
          "Content-Type": "application/dicom",
          Accept: "application/json",
        },
      });

      console.log("Orthanc upload response:", response);

      if (!response || !response.ID) {
        throw new Error(
          "Invalid response from Orthanc server - no instance ID"
        );
      }

      // Get instance details to find its series and study
      const instanceInfo = await ApiService.get(`/instances/${response.ID}`);
      const seriesInfo = await ApiService.get(
        `/series/${instanceInfo.ParentSeries}`
      );

      return {
        instanceId: response.ID,
        seriesId: instanceInfo.ParentSeries,
        studyId: seriesInfo.ParentStudy,
        isNew: response.Status === "Success",
        isStored: response.Status === "AlreadyStored",
      };
    } catch (error) {
      console.error("Upload instance error:", error);
      throw new Error(
        `Failed to upload file ${file.originalname}: ${error.message}`
      );
    }
  }

  /**
   * Checks if an instance belongs to a study by tracing through series
   */
  async isInstanceInStudy(instanceId, targetStudyId) {
    try {
      // Get instance details
      const instanceInfo = await ApiService.get(`/instances/${instanceId}`);
      if (!instanceInfo.ParentSeries) {
        throw new Error(`Instance ${instanceId} has no parent series`);
      }

      // Get series details
      const seriesInfo = await ApiService.get(
        `/series/${instanceInfo.ParentSeries}`
      );
      if (!seriesInfo.ParentStudy) {
        throw new Error(
          `Series ${instanceInfo.ParentSeries} has no parent study`
        );
      }

      // Compare study IDs
      return seriesInfo.ParentStudy === targetStudyId;
    } catch (error) {
      console.error("Error checking instance study association:", error);
      return false;
    }
  }

  /**
   * Associates an instance with a study through series management
   */
  async associateInstanceWithStudy(instanceId, targetStudyId) {
    try {
      console.log(
        `Checking association for instance ${instanceId} with study ${targetStudyId}`
      );

      // First check if instance is already in the study
      const isInStudy = await this.isInstanceInStudy(instanceId, targetStudyId);
      if (isInStudy) {
        console.log(
          `Instance ${instanceId} is already in study ${targetStudyId}`
        );
        return;
      }

      // Get instance's series info
      const instanceInfo = await ApiService.get(`/instances/${instanceId}`);
      const seriesInfo = await ApiService.get(
        `/series/${instanceInfo.ParentSeries}`
      );

      // Check if we need to create a new series in the target study
      const targetStudy = await ApiService.get(`/studies/${targetStudyId}`);

      // Find a matching series in the target study
      let targetSeriesId = null;
      for (const seriesId of targetStudy.Series) {
        const series = await ApiService.get(`/series/${seriesId}`);
        if (this.isSeriesCompatible(series, seriesInfo)) {
          targetSeriesId = seriesId;
          break;
        }
      }

      if (!targetSeriesId) {
        console.log("No compatible series found, creating new series...");
        // You might need to implement series creation
        // targetSeriesId = await this.createNewSeries(targetStudyId, seriesInfo);
        throw new Error("Series creation not implemented");
      }

      // Move instance to target series
      console.log(`Moving instance ${instanceId} to series ${targetSeriesId}`);
      await ApiService.put(`/series/${targetSeriesId}/instances/${instanceId}`);

      // Verify the move
      const newAssociation = await this.isInstanceInStudy(
        instanceId,
        targetStudyId
      );
      if (!newAssociation) {
        throw new Error("Failed to verify instance association after move");
      }

      console.log(
        `Successfully associated instance ${instanceId} with study ${targetStudyId}`
      );
    } catch (error) {
      console.error("Error in associateInstanceWithStudy:", error);
      throw new Error(`Failed to associate instance: ${error.message}`);
    }
  }

  /**
   * Checks if two series are compatible for instance sharing
   */
  isSeriesCompatible(series1, series2) {
    // Compare relevant DICOM tags to determine compatibility
    const relevantTags = [
      "Modality",
      "Manufacturer",
      "StationName",
      "ImageOrientationPatient",
    ];

    for (const tag of relevantTags) {
      if (series1.MainDicomTags[tag] !== series2.MainDicomTags[tag]) {
        return false;
      }
    }

    return true;
  }

  /**
   * Updates study metadata
   */
  //   async updateStudyMetadata(studyId, metadata) {
  //     try {
  //       const studyInfo = await ApiService.get(`/studies/${studyId}`);
  //       console.log("Current study info:", studyInfo);

  //       const modifiedStudy = {
  //         PatientMainDicomTags: {
  //           ...studyInfo.PatientMainDicomTags,
  //           PatientID: metadata.patientId,
  //           PatientName: metadata.patientId,
  //         },
  //         MainDicomTags: {
  //           ...studyInfo.MainDicomTags,
  //           StudyDate: this.formatDicomDate(metadata.studyDate),
  //           StudyDescription: metadata.description,
  //         },
  //       };

  //       console.log("Modified study data:", modifiedStudy);
  //       await ApiService.put(`/studies/${studyId}/modify`, modifiedStudy);
  //     } catch (error) {
  //       console.error("Error updating metadata:", error);
  //       throw new Error(`Failed to update study metadata: ${error.message}`);
  //     }
  //   }

  /**
   * Gets final study structure
   */
  async getStudyStructure(studyId) {
    try {
      const studyInfo = await ApiService.get(`/studies/${studyId}`);
      const { PatientMainDicomTags, MainDicomTags, Series } = studyInfo;

      // Fetch series details
      const seriesDetails = await Promise.all(
        Series.map(async (seriesId) => {
          const seriesResponse = await ApiService.get(`/series/${seriesId}`);
          const { MainDicomTags: seriesTags, Instances } = seriesResponse;

          const Modality = this.mapModalityToFrontend(seriesTags.Modality);
          if (!Modality) return null;

          const instanceIds = await Promise.all(
            Instances.map(async (instanceId) => {
              const instanceResponse = await ApiService.get(
                `/instances/${instanceId}`
              );
              return instanceResponse.ID;
            })
          );

          return { Modality, Instances: instanceIds };
        })
      );

      const validSeries = seriesDetails.filter((s) => s !== null);
      if (validSeries.length === 0) {
        throw new Error("No valid series found");
      }

      return {
        patientId: PatientMainDicomTags.PatientID,
        studyId,
        description: MainDicomTags.StudyDescription || "Description",
        studyDate: MainDicomTags.StudyDate,
        modality: validSeries[0].Modality,
        instances: validSeries.flatMap((s) => s.Instances),
      };
    } catch (error) {
      console.error("Error getting study structure:", error);
      throw new Error(`Failed to get study structure: ${error.message}`);
    }
  }

  /**
   * Maps DICOM modality to frontend representation
   */
  mapModalityToFrontend(dicomModality) {
    if (["CR", "DX", "XR"].includes(dicomModality)) return "XR";
    if (dicomModality === "MR") return "MR";
    return null;
  }

  /**
   * Formats date to DICOM standard
   */
  formatDicomDate(date) {
    return date.replace(/-/g, "");
  }
}

export default new UploadService();
