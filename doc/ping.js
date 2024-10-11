export const pingDoc = {
  "/api/ping": {
    get: {
      tags: ["PING"],
      description: "Ping Endpoint",
      responses: {
        200: {
          description: "Success response",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  messaage: {
                    type: "string",
                    example: "Welcome to Emergency Social Network",
                  },
                },
              },
            },
          },
        },
      },
    },
  },
};
