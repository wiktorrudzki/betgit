import { useReducer } from "react";
import Axios from "axios";
import { currentScoreReducer } from "../../reducer/currentScoreReducer";
import { Match } from "../../types/Match";
import { useUser } from "../../../../../hooks/useUser";

type Props = {
  match: Match;
};

const BetMatch = ({ match }: Props) => {
  const [currentScore, dispatchCurrentScore] = useReducer(
    currentScoreReducer,
    match
  );

  const { currentUser } = useUser();

  const addScore = (e: React.FormEvent) => {
    e.preventDefault();

    Axios.patch(
      "http://localhost:3001/types/bet",
      {
        matchId: match.id,
        team1_score: currentScore.team1_score,
        team2_score: currentScore.team2_score,
        userId: localStorage.getItem("user"),
      },
      {
        headers: {
          authorization: localStorage.getItem("token"),
        },
      }
    ).then((res) => {
      if (res.data.bet) {
        console.log(res.data.message);
      } else {
        console.log(res.data.message);
      }
    });
  };

  return (
    <form className="change-score-form">
      <div>{new Date(match.match_time).toString().slice(4, 21)}</div>
      <span>
        {match.team1} - {match.team2}
      </span>
      <span></span>
      <div style={{ width: "fit-content" }}>
        <input
          style={{ width: "3em" }}
          className="form-input"
          onChange={(e) => {
            dispatchCurrentScore({
              type: "team1_score",
              payload: e.target.value,
            });
          }}
          value={currentScore.team1_score?.toString()}
        />
        <span> : </span>
        <input
          style={{ width: "3em" }}
          className="form-input"
          onChange={(e) => {
            dispatchCurrentScore({
              type: "team2_score",
              payload: e.target.value,
            });
          }}
          value={currentScore.team2_score?.toString()}
        />
      </div>
      <button
        style={{ width: "10%", fontSize: "0.7em" }}
        className={`submit-btn ${
          currentScore.team1_score == null ||
          currentScore.team2_score == null ||
          currentUser === null
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

export default BetMatch;
