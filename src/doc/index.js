import { pingDoc } from "./ping";
import { radiologistInterpretationDoc } from "./radiologistInterpretation";
import { aiInterpretDoc } from "./aiInterpretation";
import { doctorCommentsDoc } from "./doctorComment";
import { studyDoc } from "./patientStudy";
import { authDoc } from "./authManagement";
import { userManagementDoc } from "./userManagement";

export const options = {
  definition: {
    openapi: "3.1.0",
    info: {
      title: "API for  RBC MiDAp",
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
      ...authDoc,
      ...userManagementDoc,
      ...radiologistInterpretationDoc,
      ...aiInterpretDoc,
      ...doctorCommentsDoc,
      ...studyDoc,
    },
  },
  apis: ["**/doc/*"],
};
