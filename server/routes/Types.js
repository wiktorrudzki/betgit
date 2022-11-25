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
    "INSERT INTO types (team1, team2, match_id, user_id) VALUES (?, ?, ?, ?)";

  db.query(dbInsert, [team1, team2, matchId, userId], (err, result) => {
    if (err) {
      res.json({ added: false, message: "error while adding type" });
    } else {
      res.json({ added: true, message: "succesfully added type" });
    }
  });
});

router.patch("/bet", verifyJWT, (req, res) => {
  const matchId = req.body.matchId;
  const team1_score = req.body.team1_score;
  const team2_score = req.body.team2_score;
  const userId = req.body.userId;
  const time = req.body.time;

  if (new Date(time) <= new Date()) {
    return res.json({
      bet: false,
      message: "do not try those bad tricks on me",
    });
  }

  const dbPatch =
    "UPDATE types SET team1_score = ?, team2_score = ? WHERE user_id = ? AND match_id = ?;";

  db.query(
    dbPatch,
    [team1_score, team2_score, userId, matchId],
    (err, result) => {
      if (err) {
        console.log(err);
        res.json({ bet: false, message: "error while betting" });
      } else {
        res.json({
          bet: true,
          message: "Success",
          time: time,
          data: new Date(),
          date: new Date(time) <= new Date(),
        });
      }
    }
  );
});

router.get("/", (req, res) => {
  const userId = req.headers["userid"];

  dbSelect = "SELECT * FROM types WHERE user_id = ?";
  if (userId !== undefined) {
    db.query(dbSelect, userId, (err, result) => {
      if (err) {
        res.json({ get: false, message: "error while getting user types" });
      } else {
        res.json({
          get: true,
          message: "succefully taken all user types",
          data: result,
        });
      }
    });
  }
});

router.get("/getByMatchIdAndUserId", verifyJWT, (req, res) => {
  const matchId = req.headers["matchid"];
  const userId = req.headers["userid"];

  const dbSelect = "SELECT * FROM types WHERE match_id = ? AND user_id = ?";

  db.query(dbSelect, [matchId, userId], (err, result) => {
    if (err) res.json({ taken: false, message: "error while taking matches" });
    else {
      res.json({
        taken: true,
        message: "successfully taken all matches with this id's",
        data: result,
      });
    }
  });
});

router.get("/getByUserId", verifyJWT, (req, res) => {
  const userId = req.headers["userid"];

  const dbSelect = "SELECT * FROM types WHERE user_id = ?";

  db.query(dbSelect, [userId], (err, result) => {
    if (err) res.json({ taken: false, message: "error while taking types" });
    else {
      res.json({
        taken: true,
        message: "successfully taken all matches with this user id",
        data: result,
      });
    }
  });
});

router.patch("/addPoints", verifyJWT, (req, res) => {
  const id = req.body.id;
  const points = req.body.points;

  const dbInsert = "UPDATE types SET points = ? where id = ?";

  db.query(dbInsert, [points, id], (err, result) => {
    if (err) {
      res.json({ added: false, message: "error while adding points" });
    } else {
      res.json({ added: true, message: "succesfully added points" });
    }
  });
});

module.exports = router;
