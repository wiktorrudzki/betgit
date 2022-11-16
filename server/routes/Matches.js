const { db } = require("../config");
const { verifyJWT } = require("../middlewares/verifyJwt");

const { addHours } = require("date-fns");
const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  const date = req.headers["mindate"];

  const dbSelect = "SELECT * FROM betgit.matches";

  db.query(dbSelect, [], (err, result) => {
    if (err) {
      res.json({ got: false, message: "error while getting matches" });
    } else {
      if (date) {
        if (date === "now") {
          result = result.filter((match) => {
            return addHours(match.match_time, 1) > Date.now();
          });
          res.json({
            got: true,
            message: "succesfully taken all matches",
            data: result,
          });
        } else {
          result = result.filter((match) => {
            return addHours(match.match_time, 1) > addHours(new Date(date), 1);
          });
          res.json({
            got: true,
            message: "succesfully taken all matches",
            data: result,
          });
        }
      } else {
        res.json({
          got: true,
          message: "succesfully taken all matches",
          data: result,
        });
      }
    }
  });
});

router.post("/add", verifyJWT, (req, res) => {
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
      res.json({
        added: true,
        message: "succesfully added new match to db",
        matchId: result.insertId,
      });
    }
  });
});

router.post("/changeScore", verifyJWT, (req, res) => {
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

module.exports = router;
