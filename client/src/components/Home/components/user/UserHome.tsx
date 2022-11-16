import { useState, useEffect } from "react";
import Axios from "axios";
import { Match } from "../types/Match";
import BetMatch from "./components/BetMatch";

const UserHome = () => {
  const [matchesToBet, setMatchesToBet] = useState<Match[]>([]);

  useEffect(() => {
    getMatches();
  }, []);

  const getMatches = () => {
    Axios.get("http://localhost:3001/matches/", {
      headers: {
        minDate: "now",
      },
    }).then((res) => {
      if (res.data.got) {
        setMatchesToBet(res.data.data);
      } else {
        console.log(res.data.message);
      }
    });
  };

  return (
    <div style={{ width: "80%" }} className="admin-form-div">
      <h2 className="admin-form-title">Wprowadź wyniki meczów</h2>
      <div className="change-score-wrapper">
        {matchesToBet.map((match) => {
          return <BetMatch key={match.id} match={match} />;
        })}
      </div>
    </div>
  );
};

export default UserHome;
