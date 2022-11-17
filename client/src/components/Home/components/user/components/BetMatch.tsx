import { useReducer } from "react";
import Axios from "axios";
import { currentScoreReducer } from "../../reducer/currentScoreReducer";
import { Match } from "../../types/Match";
import SetScoreForm from "../../../../SetScoreForm";

type Props = {
  match: Match;
};

const BetMatch = ({ match }: Props) => {
  const [currentScore, dispatchCurrentScore] = useReducer(
    currentScoreReducer,
    match
  );

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
    <SetScoreForm
      match={match}
      dispatch={dispatchCurrentScore}
      currentScore={currentScore}
      onSubmit={addScore}
    />
  );
};

export default BetMatch;
