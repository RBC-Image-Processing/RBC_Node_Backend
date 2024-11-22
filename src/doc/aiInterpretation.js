import { unsuccessful } from "./unSuccessfulDoc";
export const aiInterpretDoc = {
  "/api/interpret/": {
    get: {
      tags: ["AI Image Interpretation"],
      summary: "Retrieve interpretation of a medical image",
      description:
        "Uploads a DICOM image file to retrieve the AI-based interpretation, including prediction, confidence, and a detailed report.",
      requestBody: {
        required: true,
        content: {
          "multipart/form-data": {
            schema: {
              type: "object",
              properties: {
                file: {
                  type: "string",
                  format: "binary",
                  description: "DICOM image file to be interpreted",
                },
              },
            },
          },
        },
      },
      responses: {
        200: {
          description: "Interpretation retrieved successfully",
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
                    example: "Interpretation Retrieved successfully",
                  },
                  data: {
                    type: "object",
                    properties: {
                      prediction: {
                        type: "string",
                        example: "NORMAL",
                      },
                      confidence: {
                        type: "number",
                        format: "float",
                        example: 0.5047808885574341,
                      },
                      interpretation: {
                        type: "string",
                        example:
                          '**Interpretation:**\n\nThe medical image was classified as "NORMAL" with a confidence score of 0.50. This indicates that the model has a moderate level of confidence in its diagnosis, but it should be noted that the confidence score is not extremely high.',
                      },
                    },
                  },
                  links: {
                    type: "object",
                    properties: {
                      self: {
                        type: "string",
                        example: "http://localhost:8000/api/interpret/",
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
