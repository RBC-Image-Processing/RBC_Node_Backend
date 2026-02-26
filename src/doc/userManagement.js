import { unsuccessful } from "../doc/unSuccessfulDoc";
export const userManagementDoc = {
  "/api/user/{id}": {
    put: {
      tags: ["User Management"],
      summary: "Update user details",
      description:
        "Update the details of a specific user by their user ID. Example: update roleId for a user.",
      parameters: [
        {
          name: "id",
          in: "path",
          required: true,
          description: "The ID of the user to update",
          schema: {
            type: "integer",
            example: 1,
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
                roleId: {
                  type: "integer",
                  description: "The new role ID to assign to the user",
                },
              },
            },
          },
        },
      },
      responses: {
        201: {
          description: "User updated successfully",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  status: { type: "integer", example: 201 },
                  message: {
                    type: "string",
                    example: "User updated successfully",
                  },
                  data: { type: "object" },
                  links: {
                    type: "object",
                    properties: {
                      self: {
                        type: "string",
                        example: "http://localhost:8000/api/user/1",
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

  "/api/user/activate-account-request": {
    post: {
      tags: ["User Management"],
      summary: "Request account activation",
      description: "Send a request to activate the user's account by email.",
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                email: {
                  type: "string",
                  format: "email",
                  description:
                    "Email of the user requesting account activation",
                },
              },
            },
          },
        },
      },
      responses: {
        200: {
          description: "Email sent for account activation",
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
                          "http://localhost:8000/api/user/activate-account-request",
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

  "/api/user/activate-account": {
    post: {
      tags: ["User Management"],
      summary: "Activate user account",
      description:
        "Activate a user's account using a token and a new password.",
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                newPassword: {
                  type: "string",
                  description:
                    "The new password for the user to activate the account",
                },
              },
            },
          },
        },
      },
      responses: {
        200: {
          description: "Account activated successfully",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  status: { type: "integer", example: 200 },
                  message: {
                    type: "string",
                    example: "Account was activated successfully",
                  },
                  data: { type: "object" },
                  links: {
                    type: "object",
                    properties: {
                      self: {
                        type: "string",
                        example:
                          "http://localhost:8000/api/user/activate-account-request",
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

  "/api/user/{id}": {
    delete: {
      tags: ["User Management"],
      summary: "Delete a user",
      description: "Delete a user by their ID.",
      parameters: [
        {
          name: "id",
          in: "path",
          required: true,
          description: "The ID of the user to delete",
          schema: {
            type: "integer",
            example: 2,
          },
        },
      ],
      responses: {
        200: {
          description: "User deleted successfully",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  status: { type: "integer", example: 200 },
                  message: { type: "string", example: "User deleted" },
                  data: { type: "object" },
                  links: {
                    type: "object",
                    properties: {
                      self: {
                        type: "string",
                        example: "http://localhost:8000/api/user/2",
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

  "/api/user/{id}": {
    get: {
      tags: ["User Management"],
      summary: "Get user details",
      description: "Retrieve a specific user's details by their user ID.",
      parameters: [
        {
          name: "id",
          in: "path",
          required: true,
          description: "The ID of the user to retrieve",
          schema: {
            type: "integer",
            example: 1,
          },
        },
      ],
      responses: {
        200: {
          description: "User retrieved successfully",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  status: { type: "integer", example: 200 },
                  message: {
                    type: "string",
                    example: "User retrieved successfully",
                  },
                  data: {
                    type: "object",
                    properties: {
                      userId: { type: "integer", example: 1 },
                      roleId: { type: "integer", example: 3 },
                      fullName: { type: "string", example: "Support User" },
                      email: {
                        type: "string",
                        example: "giovannixon@gmail.com",
                      },
                      isActive: { type: "boolean", example: true },
                      verified: { type: "boolean", example: false },
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
                  links: {
                    type: "object",
                    properties: {
                      self: {
                        type: "string",
                        example: "http://localhost:8000/api/user/1",
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

  "/api/user/": {
    post: {
      tags: ["User Management"],
      summary: "Create a new user",
      description: "Create a new user with specified details.",
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                roleId: { type: "integer", example: 2 },
                fullName: { type: "string", example: "Uz" },
                email: { type: "string", example: "phytest@gmail.com" },
                isActive: { type: "boolean", example: false },
              },
            },
          },
        },
      },
      responses: {
        201: {
          description: "User created successfully",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  status: { type: "integer", example: 201 },
                  message: { type: "string", example: "User created" },
                  data: {
                    type: "object",
                    properties: {
                      userId: { type: "integer", example: 5 },
                      roleId: { type: "integer", example: 2 },
                      fullName: { type: "string", example: "Uz" },
                      email: { type: "string", example: "phytest@gmail.com" },
                      isActive: { type: "boolean", example: true },
                      createdAt: {
                        type: "string",
                        format: "date-time",
                        example: "2024-11-13T08:51:45.580Z",
                      },
                      updatedAt: {
                        type: "string",
                        format: "date-time",
                        example: "2024-11-13T08:51:45.580Z",
                      },
                    },
                  },
                  links: {
                    type: "object",
                    properties: {
                      self: {
                        type: "string",
                        example: "http://localhost:8000/api/user/",
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

  "/api/user/": {
    get: {
      tags: ["User Management"],
      summary: "Get all users",
      description: "Retrieve a list of all users.",
      responses: {
        200: {
          description: "All users retrieved successfully",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  status: { type: "integer", example: 200 },
                  message: {
                    type: "string",
                    example: "Users retrieved successfully",
                  },
                  data: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        userId: { type: "integer", example: 2 },
                        roleId: { type: "integer", example: 3 },
                        fullName: { type: "string", example: "Support User" },
                        email: {
                          type: "string",
                          example: "giovannixon@gmail.com",
                        },
                        isActive: { type: "boolean", example: true },
                        verified: { type: "boolean", example: false },
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
                  links: {
                    type: "object",
                    properties: {
                      self: {
                        type: "string",
                        example: "http://localhost:8000/api/user/",
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
