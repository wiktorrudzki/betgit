import { useReducer } from "react";
import Axios from "axios";
import { Match } from "../../types/Match";
import { currentScoreReducer } from "../../reducer/currentScoreReducer";
import SetScoreForm from "../../../../SetScoreForm";

type Props = {
  match: Match;
};

const ChangeScoreAdmin = ({ match }: Props) => {
  const [currentScore, dispatchCurrentScore] = useReducer(
    currentScoreReducer,
    match
  );

  const addScore = (e: React.FormEvent) => {
    e.preventDefault();

    Axios.post(
      "http://localhost:3001/matches/changeScore",
      {
        matchId: match.id,
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

    Axios.post(
      "http://localhost:3001/types/setScore",
      {
        matchId: match.id,
        team1: currentScore.team1,
        team2: currentScore.team2,
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

  return (
    <SetScoreForm
      match={match}
      dispatch={dispatchCurrentScore}
      currentScore={currentScore}
      onSubmit={addScore}
    />
  );
};

export default ChangeScoreAdmin;
