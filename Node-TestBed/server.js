const express = require("express");
const app = express();
const passport = require("passport");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const cookieSession = require("cookie-session");
const path = require("path");
require("dotenv/config");

//MIDDLEWARES
app.use(
  cors({
    origin: true,
    credentials: true,
  })
);
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "client", "build")));

//IMPORT SCHEMAS AND CONNECT TO DB
require("./models/User.js");
mongoose.connect(process.env.MONGODB_URI, (err) => {
  if (err) throw err;
  console.log("connected to MongoDB");
});

app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: ["somesecretsauce"],
  })
);

// ROUTES
app.get("/", (req, res) => {
  res.send({
    message: "Welcome to the IoT API",
  });
});

const dataRoutes = require("./routes/api/data");
app.use("/api/data", dataRoutes);

const d1Routes = require("./routes/api/d1");
app.use("/api/d1", d1Routes);

const d2Routes = require("./routes/api/d2");
app.use("/api/d2", d2Routes);

const d3Routes = require("./routes/api/d3");
app.use("/api/d3", d3Routes);

const d4Routes = require("./routes/api/d4");
app.use("/api/d4", d4Routes);

const d5Routes = require("./routes/api/d5");
app.use("/api/d5", d5Routes);

const d6Routes = require("./routes/api/d6");
app.use("/api/d6", d6Routes);

const d7Routes = require("./routes/api/d7");
app.use("/api/d7", d7Routes);

const d8Routes = require("./routes/api/d8");
app.use("/api/d8", d8Routes);

app.get("*", (req, res) => {
  res.status(404).send({
    message: "Path not found",
  });
});

PORT = process.env.PORT || 5050;
app.listen(PORT, function () {
  console.log("Listening on port", PORT);
  console.log(`Open here http://localhost:${PORT}`);
});
module.exports = app;
