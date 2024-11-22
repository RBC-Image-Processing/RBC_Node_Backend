import { unsuccessful } from "./unSuccessfulDoc";

export const authDoc = {
  "/api/auth/login": {
    post: {
      tags: ["Authentication"],
      summary: "Login",
      description: "Logs in a user and returns an authentication token.",
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                email: {
                  type: "string",
                  example: "admintest@gmail.com",
                  description: "Email of the user",
                },
                password: {
                  type: "string",
                  example: "a46178fd97cd1c7a",
                  description: "Password of the user",
                },
              },
            },
          },
        },
      },
      responses: {
        200: {
          description: "Login successful",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  status: { type: "integer", example: 200 },
                  message: { type: "string", example: "Login successful" },
                  data: {
                    type: "object",
                    properties: {
                      token: {
                        type: "string",
                        example:
                          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjQsInJvbGUiOjQsImlhdCI6MTczMTQ4Nzg5MH0.ofJHlzVArskBOgG4O3xe9gs_Ux0nEl_bV2y3aGLi3I4",
                      },
                      email: { type: "string", example: "admintest@gmail.com" },
                      userId: { type: "integer", example: 4 },
                      fullName: { type: "string", example: "Bright" },
                      roleName: { type: "string", example: "ADMINISTRATOR" },
                    },
                  },
                  links: {
                    type: "object",
                    properties: {
                      self: {
                        type: "string",
                        example: "http://localhost:8000/api/auth/login",
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

  "/api/auth/request-password-reset": {
    post: {
      tags: ["Authentication"],
      summary: "Request Password Reset",
      description:
        "Request a password reset by sending a reset email to the user.",
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                email: {
                  type: "string",
                  example: "giovannixon@gmail.com",
                  description: "Email of the user to request a password reset",
                },
              },
            },
          },
        },
      },
      responses: {
        200: {
          description: "Email sent for password reset",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  status: { type: "integer", example: 200 },
                  message: { type: "string", example: "Email was sent" },
                  data: { type: "object" },
                  links: {
                    type: "object",
                    properties: {
                      self: {
                        type: "string",
                        example:
                          "http://localhost:8000/api/auth/request-password-reset",
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

  "/api/auth/reset-password": {
    post: {
      tags: ["Authentication"],
      summary: "Reset Password",
      description:
        "Resets the user's password using the token provided in the URL.",
      parameters: [
        {
          name: "token",
          in: "query",
          required: true,
          description: "Password reset token",
          schema: {
            type: "string",
            example:
              "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsInJvbGUiOjQsImlhdCI6MTcyOTg0OTc2Nn0.rN2Zzva9f8ZwGF5iLKHWwECp_GiOgFkGsIJvwrObaZw",
          },
        },
      ],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                newPassword: {
                  type: "string",
                  example: "Support@123",
                  description: "New password to be set",
                },
              },
            },
          },
        },
      },
      responses: {
        200: {
          description: "Password reset successful",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  status: { type: "integer", example: 200 },
                  message: {
                    type: "string",
                    example: "Password Reset was successful",
                  },
                  data: { type: "null" },
                  links: {
                    type: "object",
                    properties: {
                      self: {
                        type: "string",
                        example:
                          "http://localhost:8000/api/auth/reset-password?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsInJvbGUiOjQsImlhdCI6MTcyOTg0OTc2Nn0.rN2Zzva9f8ZwGF5iLKHWwECp_GiOgFkGsIJvwrObaZw",
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
