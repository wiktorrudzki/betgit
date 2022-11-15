import { useReducer } from "react";
import Axios from "axios";
import { Match } from "../types/Match";
import { currentScoreReducer } from "./reducer/currentScoreReducer";

type Props = {
  match: Match;
};

const ChangeScore = ({ match }: Props) => {
  const [currentScore, dispatchCurrentScore] = useReducer(
    currentScoreReducer,
    match
  );

  const addScore = (e: React.FormEvent) => {
    e.preventDefault();

    Axios.post(
      "http://localhost:3001/matches/changeScore",
      {
        id: match.id,
        team1_score: currentScore.team1_score,
        team2_score: currentScore.team2_score,
      },
      {
        headers: {
          authorization: localStorage.getItem("token"),
        },
      }
    ).then((res) => {
      console.log(res.data.message);
    });
  };

  console.log(new Date(match.match_time));

  return (
    <form className="change-score-form">
      <div>{new Date(match.match_time).toString().slice(4, 21)}</div>
      <span>
        {match.team1} - {match.team2}
      </span>
      <span></span>
      <div style={{ width: "12%" }}>
        <input
          style={{ width: "30%" }}
          className="form-input"
          onChange={(e) => {
            dispatchCurrentScore({
              type: "team1_score",
              payload: e.target.value,
            });
          }}
          value={match.team1_score?.toString()}
        />
        <span> : </span>
        <input
          style={{ width: "30%" }}
          className="form-input"
          onChange={(e) => {
            dispatchCurrentScore({
              type: "team2_score",
              payload: e.target.value,
            });
          }}
          value={match.team2_score?.toString()}
        />
      </div>
      <button
        style={{ width: "10%", fontSize: "0.7em" }}
        className={`submit-btn ${
          currentScore.team1_score == null || currentScore.team2_score == null
            ? "disable-submit-btn"
            : ""
        }`}
        onClick={addScore}
        type="submit"
      >
        Dodaj
      </button>
    </form>
  );
};

export default ChangeScore;
