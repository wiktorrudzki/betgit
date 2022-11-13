require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mysql = require("mysql");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const saltRounds = 10;

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

app.post(
  "/register",
  body("username").isLength({ min: 3, max: 55 }),
  body("password").isLength({ min: 4 }),
  (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const confirmPassword = req.body.confirmPassword;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.json({
        created: false,
        message: "not valid length of username/password",
      });
    }

    if (password !== confirmPassword) {
      return res.json({ created: false, message: "passwords do not match" });
    }

    bcrypt.hash(password, saltRounds, (err, hash) => {
      if (err) {
        return res.json({ created: false, message: "error while adding user" });
      } else {
        const dbSelect = "SELECT * FROM betgit.users WHERE username = ?";

        db.query(dbSelect, username, (err, result) => {
          if (err) {
            return res.json({
              created: false,
              message: "error while adding user",
            });
          } else if (result && result.length > 0) {
            return res.json({
              created: false,
              message: "username already taken",
            });
          } else {
            const insertDB =
              "INSERT INTO betgit.users (username, password, admin, points) VALUES (?, ?, ?, ?);";

            db.query(insertDB, [username, hash, false, 0], (err, result) => {
              if (err) {
                res.json({
                  created: false,
                  message: "error while adding user",
                });
              } else {
                res.json({ created: true, message: "user added to db" });
              }
            });
          }
        });
      }
    });
  }
);

app.post("/login", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  const dbSelect = "SELECT * FROM betgit.users WHERE username = ?";

  db.query(dbSelect, username, (err, result) => {
    if (err) {
      return res.json({
        auth: false,
        logged: false,
        message: "error while loggin in",
      });
    } else if (result && result.length > 0) {
      bcrypt.compare(password, result[0].password, (error, response) => {
        if (response) {
          const id = result[0].id;
          const token = jwt.sign({ id }, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: 3600,
          });

          res.json({
            logged: true,
            message: "succesfully logged in",
            username: username,
            id: id,
            token: token,
          });
        } else {
          res.json({
            auth: false,
            logged: false,
            message: "wrong username/password combination",
          });
        }
      });
    } else {
      res.json({
        auth: false,
        logged: false,
        message: "wrong username/password combination",
      });
    }
  });
});

app.get("/", (req, res) => {
  const dbSelect = "SELECT * FROM betgit.users;";

  db.query(dbSelect, [], (err, result) => {
    if (err) {
      res.json({ get: false, message: "error while getting users" });
    } else {
      const data = result.map((user) => {
        return { username: user.username, points: user.points };
      });
      res.json({ get: true, message: "got all users", data: data });
    }
  });
});

app.listen(3001);
