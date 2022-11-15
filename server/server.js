require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mysql = require("mysql");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { verifyJWT } = require("./middlewares/verifyJwt");

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
            isAdmin: result[0].admin,
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
  const dbSelect = "SELECT * FROM betgit.users WHERE admin = false;";

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

app.get("/user/remember", verifyJWT, (req, res) => {
  const id = req.userId;

  if (!id) {
    return res.json({ auth: false, message: "didnt have user id" });
  }

  db.query("SELECT * FROM betgit.users WHERE id = ?", id, (err, result) => {
    if (result && result.length > 0) {
      res.json({
        auth: true,
        message: "welcome back",
        username: result[0].username,
        id: result[0].id,
        isAdmin: result[0].admin,
      });
    } else {
      res.send({ auth: false, message: "didnt find a user" });
    }
  });
});

app.get("/matches/", (req, res) => {
  const dbSelect = "SELECT * FROM betgit.matches";

  db.query(dbSelect, [], (err, result) => {
    if (err) {
      res.json({ got: false, message: "error while getting matches" });
    } else {
      res.json({
        got: true,
        message: "succesfully taken all matches",
        data: result,
      });
    }
  });
});

app.post("/matches/add", verifyJWT, (req, res) => {
  const team1 = req.body.team1;
  const team2 = req.body.team2;
  let match_time = req.body.matchTime;

  match_time = match_time.slice(0, 19);

  const dbInsert =
    "INSERT INTO betgit.matches (team1, team2, match_time) VALUES (?, ?, ?)";

  db.query(dbInsert, [team1, team2, match_time], (err, result) => {
    if (err) {
      res.json({ added: false, message: "error while adding new match" });
    } else {
      res.json({ added: true, message: "succesfully added new match to db" });
    }
  });
});

app.post("/matches/changeScore", verifyJWT, (req, res) => {
  const team1_score = req.body.team1_score;
  const team2_score = req.body.team2_score;
  const id = req.body.id;

  const dbInsert =
    "UPDATE betgit.matches SET team1_score = ?, team2_score = ? WHERE id = ?;";

  db.query(dbInsert, [team1_score, team2_score, id], (err, result) => {
    if (err) {
      res.json({ changed: false, message: "error while changing score" });
    } else {
      res.json({ added: true, message: "succesfully changed score" });
    }
  });
});

app.listen(3001);
