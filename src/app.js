const express = require("express");
const cors = require("cors");
const workerRoutes = require("./routes/workerRoutes");
const app = express();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.status(200).send("API ON");
});

app.use("/workers", workerRoutes);

module.exports = app;
