const { db } = require("../config");
const { verifyJWT } = require("../middlewares/verifyJwt");

const express = require("express");
const router = express.Router();

router.get("/", verifyJWT, (req, res) => {
  dbSelect = "SELECT * FROM correct_types";

  db.query(dbSelect, [], (err, result) => {
    if (err) {
      res.json({ get: false, message: "erorr while taking correct types" });
    } else {
      res.json({
        get: true,
        message: "Successfully taken all correct types",
        data: result,
      });
    }
  });
});

router.patch("/add", verifyJWT, (req, res) => {
  const matchId = req.body.matchId;
  const team1_score = req.body.team1_score;
  const team2_score = req.body.team2_score;

  const dbUpdate =
    "UPDATE correct_types set team1_score = ?, team2_score = ? WHERE match_id = ?";

  db.query(dbUpdate, [team1_score, team2_score, matchId], (err, result) => {
    if (err) {
      res.json({ set: false, message: "error while setting score" });
    } else {
      res.json({ set: true, message: "Success", matchId: matchId });
    }
  });
});

router.post("/add", verifyJWT, (req, res) => {
  const matchId = req.body.matchId;
  const team1_score = req.body.team1_score;
  const team1 = req.body.team1;
  const team2_score = req.body.team2_score;
  const team2 = req.body.team2;

  const dbInsert =
    "INSERT INTO correct_types (team1, team2, team1_score, team2_score, match_id) VALUES (?, ?, ?, ?, ?)";

  db.query(
    dbInsert,
    [team1, team2, team1_score, team2_score, matchId],
    (err, result) => {
      if (err) {
        res.json({ set: false, message: "error while setting score" });
      } else {
        res.json({ set: true, message: "Success", matchId: matchId });
      }
    }
  );
});

router.get("/getByMatchId", verifyJWT, (req, res) => {
  const matchId = req.headers["matchid"];

  const dbSelect = "SELECT * FROM correct_types WHERE match_id = ?";

  db.query(dbSelect, matchId, (err, result) => {
    if (err) res.json({ taken: false, message: "error while taking matches" });
    else {
      res.json({
        taken: true,
        message: "successfully taken all matches with this id",
        data: result,
      });
    }
  });
});

module.exports = router;
