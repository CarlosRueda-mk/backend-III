import swaggerJSDoc from "swagger-jsdoc";

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: " ShipNow API",
      version: "1.0.0",
      description: "API documentation for ShipNow ",
    },

    servers: [
      {
        url: "http://localhost:3000",
        description: "local Server",
      },
    ],

    tags: [
      {
        name: "Health",
        description: "Endpoints for checking the health of the API",
      },
      {
        name: "Products",
        description: "Endpoints related to product management",
      },
      {
        name: "Users",
        description: "Endpoints related to user management",
      },
      {
        name: "Orders",
        description: "Endpoints related to order management",
      },
      {
        name: "Deliveries",
        description: "Endpoints related to delivery management",
      },
      {
        name: "Mocks",
        description: "Endpoints for generating and inserting test data",
      },
      {
        name: "Logger",
        description: "Endpoints for validating the logging system",
      },
    ],
  },

  apis: ["./docs/**/*.yaml"],
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);

export default swaggerSpec;
