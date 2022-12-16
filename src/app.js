const express = require("express");
const cors = require("cors");
const path = require("node:path");
const workerRoutes = require("./routes/workerRoutes");
const companyRoutes = require("./routes/companyRoutes");
const opportunityRoutes = require("./routes/opportunityRoutes");
const app = express();
const swaggerUI = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");

app.get("/public/swagger-ui.css", function (req, res) {
  res.sendFile("swagger-ui.css", { root: path.join(__dirname, "public") });
});

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Vagas API",
      version: "1.0.0",
      description: "API para buscar vaga e/ou trabalhador",
    },
    servers: [
      {
        url: "http://localhost:5000",
      },
      {
        url: "https://on18-tet-projeto-livre.vercel.app",
      },
    ],
  },
  apis: ["./src/routes/*.js"],
};

const options2 = {
  customCssUrl: "/public/swagger-ui.css",
};

const specs = swaggerJsDoc(options);

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs, options2));

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.status(200).send("API ON");
});

app.use("/workers", workerRoutes);
app.use("/companies", companyRoutes);
app.use("/jobs", opportunityRoutes);

module.exports = app;
