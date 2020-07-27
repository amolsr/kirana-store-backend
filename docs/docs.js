module.exports = {
  openapi: "3.0.1",
  info: {
    version: "1.0.0",
    title: "Late-Entry-Portal",
    description: "Late Entry Management API",
    contact: {
      name: "Amol Saini",
      email: "amol.saini567@gmail.com",
    },
  },
  servers: [
    {
      url: "http://localhost:3000",
      description: "Local server",
    },
    {
      url: "https://kiranastorebackend.herokuapp.com",
      description: "Production server",
    },
  ],
  security: [
    {
      bearerAuth: [],
    },
  ],
  tags: [
    {
      name: "Auth",
    },
  ],
  paths: {
    "/register/user": {
      post: {
        tags: ["Auth"],
        description: "Create New User",
        operationId: "addUser",
        requestBody: {
          description: "User Details",
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  name: {
                    type: "string",
                    example: "Amol Saini",
                  },
                  mobile: {
                    type: "string",
                    example: "8126544009",
                  },
                  email: {
                    type: "string",
                    example: "amol.saini567@gmail.com",
                  },
                  password: {
                    type: "string",
                    example: "8126544009",
                  },
                },
              },
            },
          },
        },
        responses: {
          "200": {
            description: "Success",
          },
          "409": {
            description: "User Exist",
          },
        },
      },
    },
    "/register/shop": {
      post: {
        tags: ["Auth"],
        description: "Create New shop",
        operationId: "addShop",
        requestBody: {
          description: "Shop Details",
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  owner: {
                    type: "string",
                    example: "5edcd9e7384e4e00171191e5",
                  },
                  shopName: {
                    type: "string",
                    example: "ABC",
                  },
                  gstNumber: {
                    type: "number",
                    example: "12345678932165",
                  },
                  addressLine: {
                    type: "string",
                    example: "h-21",
                  },
                  pincode: {
                    type: "string",
                    example: "246149",
                  },
                  city: {
                    type: "string",
                    example: "kotdwar",
                  },
                  range: {
                    type: "number",
                    example: "3",
                  },
                  service: {
                    type: "array",
                    items: {
                      type: "string",
                      example: "General",
                    },
                  },
                },
              },
            },
          },
        },
        responses: {
          "200": {
            description: "Success",
          },
          "409": {
            description: "Shop Exist",
          },
        },
      },
    },
  },
  components: {
    schemas: {
      User: {
        type: "object",
        properties: {
          _id: {
            type: "string",
            example: "5edcd9e7384e4e00171191e5",
          },
          name: {
            type: "string",
            example: "Amol Saini",
          },
          mobile: {
            type: "number",
            example: 9876543210,
          },
          email: {
            type: "string",
            example: "abc@gmail.com",
          },
          password: {
            type: "string",
            example:
              "$2b$10$Ddp4bfj0sJfLuOuX4LdzA.voLfbxpDpZT8pW.LtUqDEF1LSbdPA6S",
          },
          createdAt: {
            type: "string",
            example: "2020-03-13T14:42:01.826+00:00",
          },
          updatedAt: {
            type: "string",
            example: "2020-03-13T14:42:01.826+00:00",
          },
          __v: {
            type: "number",
            example: 0,
          },
        },
      },
      Shop: {
        type: "object",
        properties: {
          _id: {
            type: "string",
            example: "5edcd9e7384e4e00171191e5",
          },
          userId: {
            type: "string",
            example: "5edcd9e7384e4e00171191e5",
          },
          shopName: {
            type: "string",
            example: "ABC",
          },
          gstNumber: {
            type: "number",
            example: "12345678932165",
          },
          addressLine: {
            type: "string",
            example: "h-21",
          },
          pincode: {
            type: "string",
            example: "246149",
          },
          city: {
            type: "string",
            example: "kotdwar",
          },
          range: {
            type: "number",
            example: "3",
          },
          service: {
            type: "array",
            items: {
              type: "string",
              example: "General",
            },
          },
          createdAt: {
            type: "string",
            example: "2020-03-13T14:42:01.826+00:00",
          },
          updatedAt: {
            type: "string",
            example: "2020-03-13T14:42:01.826+00:00",
          },
          __v: {
            type: "number",
            example: 0,
          },
        },
      },
    },
    securitySchemes: {
      bearerAuth: {
        description: "JWT token Retrived After Login",
        scheme: "bearer",
        bearerFormat: "JWT",
        type: "http",
      },
    },
  },
};
