import { useReducer, useRef } from "react";
import Axios from "axios";
import { currentScoreReducer } from "../../reducer/currentScoreReducer";
import { Match } from "../../types/Match";
import SetScoreForm from "../../../../SetScoreForm";
import { Type } from "../types";

type Props = {
  match: Match;
  type: Type | undefined;
};

const BetMatch = ({ match, type }: Props) => {
  const checkIconRef = useRef<null | HTMLImageElement>(null);

  const [currentScore, dispatchCurrentScore] = useReducer(
    currentScoreReducer,
    match
  );

  const addScore = (e: React.FormEvent) => {
    e.preventDefault();

    Axios.patch(
      `https://betgit.wiktorrudzki.pl/api/types/bet`,
      {
        matchId: match.id,
        team1_score: currentScore.team1_score,
        team2_score: currentScore.team2_score,
        userId: localStorage.getItem("user"),
        time: match.match_time,
      },
      {
        headers: {
          authorization: localStorage.getItem("token"),
        },
      }
    ).then((res) => {
      if (res.data.bet) {
        if (checkIconRef.current) {
          checkIconRef.current.style.display = "initial";
          setTimeout(() => {
            if (checkIconRef.current)
              checkIconRef.current.style.display = "none";
          }, 2000);
        }
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
      type={type}
      checkIconRef={checkIconRef}
    />
  );
};

export default BetMatch;
