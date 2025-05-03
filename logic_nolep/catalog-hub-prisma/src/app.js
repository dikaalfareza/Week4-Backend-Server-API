const express = require("express");
const app = express();
const routes = require("./routes/routes");
const errorHandler = require("./middlewares/errorHandler");

app.use(express.json());

app.get("/", (req, res) => {
  res.send("welcome to catalog-hub-prisma!");
});

app.use("/api", routes);

app.use(errorHandler);

module.exports = app;
