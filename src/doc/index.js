import { pingDoc } from "./ping";
export const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API for Emergency Social Network-RW4",
      version: "1.0.0",
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
    servers: [
      {
        url: `http://localhost:${process.env.PORT}`,
        description: "Development Server",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          in: "header",
          name: "Authorization",
          description: "Bearer token to access these api endpoints",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    paths: {
      ...pingDoc,

    },
  },
  apis: ["**/doc/*"],
};
