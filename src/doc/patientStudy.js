import { unsuccessful } from "./unSuccessfulDoc";

export const studyDoc = {
  "/api/study/": {
    get: {
      tags: ["Study Management"],
      summary: "Get all studies",
      description: "Retrieves a list of all studies in the system.",
      responses: {
        200: {
          description: "Studies retrieved successfully",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  status: { type: "integer", example: 200 },
                  message: {
                    type: "string",
                    example: "Studies Retrieved successfully",
                  },
                  data: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        patientId: {
                          type: "string",
                          example: "c0eabd79-0f88-4db8-b515-83a4c5a9ffde",
                        },
                        patientName: {
                          type: "string",
                          example: "c0eabd79-0f88-4db8-b515-83a4c5a9ffde",
                        },
                        studyId: {
                          type: "string",
                          example:
                            "1b97e43a-fe6a06f3-cf40f44e-fc9acdda-f067aa51",
                        },
                        description: { type: "string", example: "Description" },
                        studyDate: { type: "string", example: "19010101" },
                        modality: { type: "string", example: "CR" },
                        instances: {
                          type: "array",
                          items: {
                            type: "string",
                            example:
                              "28ee92f5-832c8865-16b9ea0a-382b935f-e4bb6d30",
                          },
                        },
                      },
                    },
                  },
                  links: {
                    type: "object",
                    properties: {
                      self: {
                        type: "string",
                        example: "http://localhost:8000/api/study/",
                      },
                    },
                  },
                },
              },
            },
          },
        },
        ...unsuccessful,
      },
    },
  },

  "/api/study/{studyId}": {
    get: {
      tags: ["Study Management"],
      summary: "Get a specific study by ID",
      description: "Retrieves a specific study by its ID.",
      parameters: [
        {
          name: "studyId",
          in: "path",
          required: true,
          description: "ID of the study to retrieve",
          schema: {
            type: "string",
            example: "1b97e43a-fe6a06f3-cf40f44e-fc9acdda-f067aa51",
          },
        },
      ],
      responses: {
        200: {
          description: "Study retrieved successfully",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  status: { type: "integer", example: 200 },
                  message: {
                    type: "string",
                    example: "Study Retrieved successfully",
                  },
                  data: {
                    type: "object",
                    properties: {
                      ID: {
                        type: "string",
                        example: "1b97e43a-fe6a06f3-cf40f44e-fc9acdda-f067aa51",
                      },
                      IsStable: { type: "boolean", example: true },
                      LastUpdate: {
                        type: "string",
                        example: "20241030T162506",
                      },
                      MainDicomTags: {
                        type: "object",
                        properties: {
                          AccessionNumber: { type: "string", example: "" },
                          ReferringPhysicianName: {
                            type: "string",
                            example: "",
                          },
                          StudyDate: { type: "string", example: "19010101" },
                          StudyID: { type: "string", example: "" },
                          StudyInstanceUID: {
                            type: "string",
                            example:
                              "1.2.276.0.7230010.3.1.2.8323329.2158.1517874294.949746",
                          },
                          StudyTime: { type: "string", example: "000000.00" },
                        },
                      },
                      ParentPatient: {
                        type: "string",
                        example: "8acb6438-cbbaadc4-6eecc541-46c46a57-592fd65d",
                      },
                      PatientMainDicomTags: {
                        type: "object",
                        properties: {
                          PatientBirthDate: { type: "string", example: "" },
                          PatientID: {
                            type: "string",
                            example: "c0eabd79-0f88-4db8-b515-83a4c5a9ffde",
                          },
                          PatientName: {
                            type: "string",
                            example: "c0eabd79-0f88-4db8-b515-83a4c5a9ffde",
                          },
                          PatientSex: { type: "string", example: "M" },
                        },
                      },
                      Series: {
                        type: "array",
                        items: {
                          type: "string",
                          example:
                            "c3e9e317-c75fc44d-1572190a-6dfa2b68-8384b61d",
                        },
                      },
                      Type: { type: "string", example: "Study" },
                    },
                  },
                  links: {
                    type: "object",
                    properties: {
                      self: {
                        type: "string",
                        example:
                          "http://localhost:8000/api/study/1b97e43a-fe6a06f3-cf40f44e-fc9acdda-f067aa51",
                      },
                    },
                  },
                },
              },
            },
          },
        },
        ...unsuccessful,
      },
    },
  },
};
