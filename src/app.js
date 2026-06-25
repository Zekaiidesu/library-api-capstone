const express = require("express");
const cors = require("cors");

const swaggerUi =
require("swagger-ui-express");

const YAML =
require("yamljs");

const swaggerDocument =
YAML.load("./swagger.yaml");

const authRoutes =
require("./routes/authRoutes");

const bookRoutes =
require("./routes/bookRoutes");

const borrowRoutes =
require("./routes/borrowRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocument)
);

app.use("/auth", authRoutes);
app.use("/books", bookRoutes);
app.use("/borrow", borrowRoutes);

app.get("/", (req, res) => {
  res.json({
    message: "Library API Running"
  });
});

module.exports = app;
