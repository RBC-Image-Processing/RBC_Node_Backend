import { unsuccessful } from "../doc/unSuccessfulDoc";
export const radiologistInterpretationDoc = {
  "/api/interpretation/study/{studyId}": {
    get: {
      tags: ["Interpretation"],
      description:
        "Get a list of radiology interpretations for a specific study",
      parameters: [
        {
          in: "path",
          name: "studyId",
          required: true,
          schema: {
            type: "string",
            example: "8fb3d973-4449cad4-c21bb79d-81c41b56-b9412373",
          },
          description: "Unique identifier for the study",
        },
      ],
      security: [
        {
          bearerAuth: {
            type: "http",
            scheme: "bearer",
            bearerFormat: "JWT",
            description: "JWT Bearer token",
            in: "header",
          },
        },
      ],
      responses: {
        200: {
          description: "Interpretations retrieved successfully",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  status: {
                    type: "integer",
                    example: 200,
                  },
                  message: {
                    type: "string",
                    example: "Interpretation retrieved successfully",
                  },
                  data: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        interpretationId: {
                          type: "integer",
                          example: 6,
                        },
                        studyId: {
                          type: "string",
                          example:
                            "8fb3d973-4449cad4-c21bb79d-81c41b56-b9412373",
                        },
                        userId: {
                          type: "integer",
                          example: 1,
                        },
                        diagnosis: {
                          type: "string",
                          example: "Pneumonia is real",
                        },
                        timestamp: {
                          type: "string",
                          format: "date-time",
                          example: "2024-11-15T08:49:51.652Z",
                        },
                        User: {
                          type: "object",
                          properties: {
                            userId: {
                              type: "integer",
                              example: 1,
                            },
                            roleId: {
                              type: "integer",
                              example: 3,
                            },
                            fullName: {
                              type: "string",
                              example: "Support User",
                            },
                            email: {
                              type: "string",
                              example: "giovannixon@gmail.com",
                            },
                            isActive: {
                              type: "boolean",
                              example: true,
                            },
                            verified: {
                              type: "boolean",
                              example: false,
                            },
                            createdAt: {
                              type: "string",
                              format: "date-time",
                              example: "2024-10-31T13:22:31.334Z",
                            },
                            updatedAt: {
                              type: "string",
                              format: "date-time",
                              example: "2024-11-13T07:03:52.270Z",
                            },
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
                        example:
                          "http://localhost:8000/api/interpretation/study/8fb3d973-4449cad4-c21bb79d-81c41b56-b9412373",
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
    post: {
      tags: ["Interpretation"],
      description: "Create a new radiology interpretation",
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                studyId: {
                  type: "string",
                  example: "1b97e43a-fe6a06f3-cf40f44e-fc9acdda-f067aa51",
                },
                userId: {
                  type: "integer",
                  example: 1,
                },
                diagnosis: {
                  type: "string",
                  example: "Pneumonia with pleural infession",
                },
              },
            },
          },
        },
      },
      security: [
        {
          bearerAuth: {
            type: "http",
            scheme: "bearer",
            bearerFormat: "JWT",
            description: "JWT Bearer token",
            in: "header",
          },
        },
      ],
      responses: {
        201: {
          description: "Interpretation created successfully",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  status: {
                    type: "integer",
                    example: 201,
                  },
                  message: {
                    type: "string",
                    example: "Interpretation created successfully",
                  },
                  data: {
                    type: "object",
                    properties: {
                      timestamp: {
                        type: "string",
                        format: "date-time",
                        example: "2024-11-13T11:55:17.173Z",
                      },
                      interpretationId: {
                        type: "integer",
                        example: 1,
                      },
                      studyId: {
                        type: "string",
                        example: "1b97e43a-fe6a06f3-cf40f44e-fc9acdda-f067aa51",
                      },
                      userId: {
                        type: "integer",
                        example: 1,
                      },
                      diagnosis: {
                        type: "string",
                        example: "Pneumonia with pleural infession",
                      },
                    },
                  },
                  links: {
                    type: "object",
                    properties: {
                      self: {
                        type: "string",
                        example: "http://localhost:8000/api/interpretation/",
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
  "/api/interpretation/{interpretationId}": {
    put: {
      tags: ["Interpretation"],
      description: "Update an existing interpretation",
      parameters: [
        {
          in: "path",
          name: "interpretationId",
          required: true,
          schema: {
            type: "integer",
            example: 1,
          },
          description: "Unique identifier for the interpretation",
        },
      ],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                diagnosis: {
                  type: "string",
                  example: "Updated diagnosis",
                },
              },
            },
          },
        },
      },
      security: [
        {
          bearerAuth: {
            type: "http",
            scheme: "bearer",
            bearerFormat: "JWT",
            description: "JWT Bearer token",
            in: "header",
          },
        },
      ],
      responses: {
        200: {
          description: "Interpretation updated successfully",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  status: {
                    type: "integer",
                    example: 200,
                  },
                  message: {
                    type: "string",
                    example: "Interpretation updated successfully",
                  },
                  data: {
                    type: "object",
                    properties: {
                      interpretationId: {
                        type: "integer",
                        example: 1,
                      },
                      studyId: {
                        type: "string",
                        example: "1b97e43a-fe6a06f3-cf40f44e-fc9acdda-f067aa51",
                      },
                      userId: {
                        type: "integer",
                        example: 1,
                      },
                      diagnosis: {
                        type: "string",
                        example: "Pneumonia de",
                      },
                      timestamp: {
                        type: "string",
                        format: "date-time",
                        example: "2024-11-22T09:52:48.856Z",
                      },
                    },
                  },
                  links: {
                    type: "object",
                    properties: {
                      self: {
                        type: "string",
                        example: "http://localhost:8000/api/interpretation/1",
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
    delete: {
      tags: ["Interpretation"],
      description: "Delete an interpretation",
      parameters: [
        {
          in: "path",
          name: "interpretationId",
          required: true,
          schema: {
            type: "integer",
            example: 1,
          },
          description: "Unique identifier for the interpretation",
        },
      ],
      security: [
        {
          bearerAuth: {
            type: "http",
            scheme: "bearer",
            bearerFormat: "JWT",
            description: "JWT Bearer token",
            in: "header",
          },
        },
      ],
      responses: {
        200: {
          description: "Interpretation deleted successfully",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  status: {
                    type: "integer",
                    example: 200,
                  },
                  message: {
                    type: "string",
                    example: "Interpretation deleted successfully",
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
