const { db } = require("../config");
const { verifyJWT } = require("../middlewares/verifyJwt");

const express = require("express");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const router = express.Router();
const jwt = require("jsonwebtoken");

const saltRounds = 10;

router.post(
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
        const dbSelect = "SELECT * FROM users WHERE username = ?";

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
              "INSERT INTO users (username, password, admin, points) VALUES (?, ?, ?, ?);";

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

router.post("/login", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const dbSelect = "SELECT * FROM users WHERE username = ?";
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

router.get("/", (req, res) => {
  const dbSelect = "SELECT * FROM users WHERE admin = false;";

  db.query(dbSelect, [], (err, result) => {
    if (err) {
      res.json({
        get: false,
        message: "error while getting users",
        err: err,
      });
    } else {
      const data = result.map((user) => {
        return { username: user.username, points: user.points, id: user.id };
      });
      res.json({ get: true, message: "got all users", data: data });
    }
  });
});

router.get("/remember", verifyJWT, (req, res) => {
  const id = req.userId;

  if (!id) {
    return res.json({ auth: false, message: "didnt have user id" });
  }

  db.query("SELECT * FROM users WHERE id = ?", id, (err, result) => {
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

router.patch("/addPoints", verifyJWT, (req, res) => {
  const points = req.body.points;
  const userId = req.body.userId;

  const updateDb = "UPDATE users SET points = points + ? WHERE id = ?";

  db.query(updateDb, [points, userId], (err, result) => {
    if (err) {
      res.json({ added: false, message: "error while adding points" });
    } else {
      res.json({ added: true, message: "successfully added points" });
    }
  });
});

module.exports = router;
