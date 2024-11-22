export const unsuccessful = {
  400: {
    description: "Bad Request response",
    content: {
      "application/json": {
        schema: {
          type: "object",
          properties: {
            data: {
              type: "object",
              example: {
                status: 400,
                message: "bad request",
              },
            },
          },
        },
      },
    },
  },
  401: {
    description: "Unauthorized response",
    content: {
      "application/json": {
        schema: {
          type: "object",
          properties: {
            data: {
              type: "object",
              example: {
                status: 401,
                message: "Unauthorized: Missing or invalid token.",
              },
            },
          },
        },
      },
    },
  },
  404: {
    description: "Not Found response",
    content: {
      "application/json": {
        schema: {
          type: "object",
          properties: {
            data: {
              type: "object",
              example: {
                error: "Not found",
              },
            },
          },
        },
      },
    },
  },
  500: {
    description: "Internal server error occured",
    content: {
      "application/json": {
        schema: {
          type: "object",
          properties: {
            message: {
              type: "string",
              example: "Internal server error",
            },
          },
        },
      },
    },
  },
};
