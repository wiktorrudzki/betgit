require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const userRoute = require("./routes/User");
const matchesRoute = require("./routes/Matches");
const typesRoute = require("./routes/Types");
const correctTypesRoute = require("./routes/CorrectTypes");

const app = express();

app.use(
  cors({
    origin: ["http://localhost:3000", "https://betgit.wiktorrudzki.pl/"],
    methods: ["GET", "POST", "DELETE", "PATCH", "PUT"],
    credentials: true,
  })
);

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api/user/", userRoute);
app.use("/api/matches/", matchesRoute);
app.use("/api/types/", typesRoute);
app.use("/api/correctTypes", correctTypesRoute);

app.listen(3001);
