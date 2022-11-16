const { db } = require("../config");
const { verifyJWT } = require("../middlewares/verifyJwt");

const express = require("express");
const router = express.Router();

router.post("/add", verifyJWT, (req, res) => {
  const team1 = req.body.team1;
  const team2 = req.body.team2;
  const matchId = req.body.matchId;
  const userId = req.body.userId;

  const dbInsert =
    "INSERT INTO betgit.types (team1, team2, match_id, user_id) VALUES (?, ?, ?, ?)";

  db.query(dbInsert, [team1, team2, matchId, userId], (err, result) => {
    if (err) {
      res.json({ added: false, message: "error while adding type" });
    } else {
      res.json({ added: true, message: "succesfully added type" });
    }
  });
});

router.post("/setScore", verifyJWT, (req, res) => {
  const matchId = req.body.matchId;
  const team1_score = req.body.team1_score;
  const team1 = req.body.team1;
  const team2_score = req.body.team2_score;
  const team2 = req.body.team2;

  const dbInsert =
    "INSERT INTO betgit.correct_types (team1, team2, team1_score, team2_score, match_id) VALUES (?, ?, ?, ?, ?)";

  db.query(
    dbInsert,
    [team1, team2, team1_score, team2_score, matchId],
    (err, result) => {
      if (err) {
        res.json({ set: false, message: "error while setting score" });
      } else {
        res.json({ set: true, message: "Success" });
      }
    }
  );
});

router.patch("/bet", verifyJWT, (req, res) => {
  const matchId = req.body.matchId;
  const team1_score = req.body.team1_score;
  const team2_score = req.body.team2_score;
  const userId = req.body.userId;

  const dbPatch =
    "UPDATE betgit.types SET team1_score = ?, team2_score = ? WHERE user_id = ? AND match_id = ?;";

  db.query(
    dbPatch,
    [team1_score, team2_score, userId, matchId],
    (err, result) => {
      if (err) {
        console.log(err);
        res.json({ bet: false, message: "error while betting" });
      } else {
        res.json({ bet: true, message: "Success" });
      }
    }
  );
});

module.exports = router;
