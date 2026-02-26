import { unsuccessful } from "./unSuccessfulDoc";

export const doctorCommentsDoc = {
  "/api/doctor-comments/": {
    get: {
      tags: ["Doctor Comments"],
      summary: "Get all doctor comments",
      description: "Retrieves all doctor comments in the system.",
      responses: {
        200: {
          description: "Doctor comments retrieved successfully",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  message: {
                    type: "string",
                    example: "Doctor comments retrieved successfully",
                  },
                  data: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        doctorCommentId: { type: "integer", example: 2 },
                        aiInterpretationId: { type: "integer", example: 1 },
                        userId: { type: "integer", example: 2 },
                        rating: { type: "integer", example: 4 },
                        comment: {
                          type: "string",
                          example:
                            "This is a doctor comment on the interpretation.",
                        },
                        timestamp: {
                          type: "string",
                          format: "date-time",
                          example: "2024-11-15T01:41:40.713Z",
                        },
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
      tags: ["Doctor Comments"],
      summary: "Create a new doctor comment",
      description: "Allows a doctor to add a comment on an AI interpretation.",
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                aiInterpretationId: { type: "integer", example: 1 },
                userId: { type: "integer", example: 1 },
                rating: { type: "integer", example: 5 },
                comment: {
                  type: "string",
                  example: "This is a doctor comment on the interpretation.",
                },
              },
            },
          },
        },
      },
      responses: {
        201: {
          description: "Doctor comment created successfully",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  message: {
                    type: "string",
                    example: "Doctor comment created successfully",
                  },
                  data: {
                    type: "object",
                    properties: {
                      timestamp: {
                        type: "string",
                        format: "date-time",
                        example: "2024-11-22T10:26:41.820Z",
                      },
                      doctorCommentId: { type: "integer", example: 9 },
                      aiInterpretationId: { type: "integer", example: 1 },
                      userId: { type: "integer", example: 1 },
                      rating: { type: "integer", example: 5 },
                      comment: {
                        type: "string",
                        example:
                          "This is a doctor comment on the interpretation.",
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
  "/api/doctor-comments/study/{studyId}": {
    get: {
      tags: ["Doctor Comments"],
      summary: "Get doctor comments by study ID",
      description: "Retrieves all comments for a specific study by its ID.",
      parameters: [
        {
          name: "studyId",
          in: "path",
          required: true,
          schema: { type: "string", example: "12345" },
          description:
            "The ID of the study for which comments are being retrieved.",
        },
      ],
      responses: {
        200: {
          description: "Doctor comments retrieved successfully",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  message: {
                    type: "string",
                    example: "Doctor comments retrieved successfully",
                  },
                  data: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        doctorCommentId: { type: "integer", example: 2 },
                        aiInterpretationId: { type: "integer", example: 1 },
                        userId: { type: "integer", example: 2 },
                        rating: { type: "integer", example: 4 },
                        comment: {
                          type: "string",
                          example:
                            "This is a doctor comment on the interpretation.",
                        },
                        timestamp: {
                          type: "string",
                          format: "date-time",
                          example: "2024-11-15T01:41:40.713Z",
                        },
                        AIInterpretation: {
                          type: "object",
                          properties: {
                            aiInterpretationId: { type: "integer", example: 1 },
                            studyId: { type: "string", example: "12345" },
                            diagnosis: {
                              type: "string",
                              example: "Pneumonia detected",
                            },
                            confidenceScore: {
                              type: "number",
                              example: 0.5817602276802063,
                            },
                          },
                        },
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
  "/api/doctor-comments/{doctorCommentId}": {
    patch: {
      tags: ["Doctor Comments"],
      summary: "Update a doctor comment by its ID",
      description: "Allows a doctor to update their comment.",
      parameters: [
        {
          name: "doctorCommentId",
          in: "path",
          required: true,
          schema: { type: "integer", example: 2 },
          description: "The ID of the comment to be updated.",
        },
      ],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                rating: { type: "integer", example: 4 },
                comment: { type: "string", example: "Updated comment text" },
              },
            },
          },
        },
      },
      responses: {
        200: {
          description: "Doctor comment updated successfully",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  message: {
                    type: "string",
                    example: "Doctor comment updated successfully",
                  },
                  data: {
                    type: "object",
                    properties: {
                      doctorCommentId: { type: "integer", example: 2 },
                      aiInterpretationId: { type: "integer", example: 1 },
                      userId: { type: "integer", example: 2 },
                      rating: { type: "integer", example: 4 },
                      comment: {
                        type: "string",
                        example: "Updated comment text",
                      },
                      timestamp: {
                        type: "string",
                        format: "date-time",
                        example: "2024-11-15T01:41:40.713Z",
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
  "/api/doctor-comments/doctor/{doctorId}": {
    get: {
      tags: ["Doctor Comments"],
      summary: "Get comments by doctor ID",
      description: "Retrieves all comments made by a specific doctor.",
      parameters: [
        {
          name: "doctorId",
          in: "path",
          required: true,
          schema: { type: "integer", example: 2 },
          description:
            "The ID of the doctor whose comments are being retrieved.",
        },
      ],
      responses: {
        200: {
          description: "Comments by the doctor retrieved successfully",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  message: {
                    type: "string",
                    example: "Comments by the doctor retrieved successfully",
                  },
                  data: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        doctorCommentId: { type: "integer", example: 2 },
                        aiInterpretationId: { type: "integer", example: 1 },
                        userId: { type: "integer", example: 2 },
                        rating: { type: "integer", example: 4 },
                        comment: {
                          type: "string",
                          example: "Updated comment text",
                        },
                        timestamp: {
                          type: "string",
                          format: "date-time",
                          example: "2024-11-15T01:41:40.713Z",
                        },
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
  "/api/doctor-comments/{aiInterpretationId}": {
    get: {
      tags: ["Doctor Comments"],
      summary: "Get comments by AI Interpretation ID",
      description:
        "Retrieves all comments associated with a specific AI interpretation.",
      parameters: [
        {
          name: "aiInterpretationId",
          in: "path",
          required: true,
          schema: { type: "integer", example: 1 },
          description: "The ID of the AI interpretation.",
        },
      ],
      responses: {
        200: {
          description: "Doctor comments retrieved successfully",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  message: {
                    type: "string",
                    example: "Doctor comments retrieved successfully",
                  },
                  data: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        doctorCommentId: { type: "integer", example: 3 },
                        aiInterpretationId: { type: "integer", example: 1 },
                        userId: { type: "integer", example: 1 },
                        rating: { type: "integer", example: 5 },
                        comment: {
                          type: "string",
                          example: "Excellent diagnosis.",
                        },
                        timestamp: {
                          type: "string",
                          format: "date-time",
                          example: "2024-11-15T01:41:40.713Z",
                        },
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
