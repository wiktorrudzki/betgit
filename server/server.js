require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mysql = require("mysql");

const app = express();

const db = mysql.createConnection({
  host: "localhost",
  port: "3306",
  user: "root",
  password: process.env.MYSQL_PASSWORD,
  database: "betgit",
});

app.use(
  cors({
    origin: ["http://localhost:3000", "https://betgit.wiktorrudzki.pl"],
    methods: ["GET", "POST", "DELETE", "PATCH"],
    credentials: true,
  })
);

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post("/register", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  const insertDB =
    "INSERT INTO betgit.users (username, password, admin, points) VALUES (?, ?, ?, ?);";

  db.query(insertDB, [username, password, false, 0], (err, result) => {
    console.log(result);
  });
});

app.listen(3001);
