const express = require("express");
const router = express.Router();

router.post("/register", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  const insertDB =
    "INSERT INTO betgit.users (username, password, admin, points) VALUES (?, ?, ?, ?);";

  db.query(insertDB, [username, password, false, 0], (err, result) => {
    console.log(result);
  });
});

module.exports = router;
