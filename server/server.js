require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mysql = require("mysql");

const userRoute = require("./routes/User");
const matchesRoute = require("./routes/Matches");
const typesRoute = require("./routes/Types");

const app = express();

app.use(
  cors({
    origin: ["http://localhost:3000", "https://betgit.wiktorrudzki.pl"],
    methods: ["GET", "POST", "DELETE", "PATCH"],
    credentials: true,
  })
);

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/user/", userRoute);
app.use("/matches/", matchesRoute);
app.use("/types/", typesRoute);

app.listen(3001);
