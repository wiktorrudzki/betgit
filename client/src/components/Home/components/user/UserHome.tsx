import { useState, useEffect } from "react";
import Axios from "axios";
import { Match } from "../types/Match";
import BetMatch from "./components/BetMatch";
import { Type } from "./types";

const UserHome = () => {
  const [matchesToBet, setMatchesToBet] = useState<Match[]>([]);
  const [userTypes, setUserTypes] = useState<Type[]>([]);

  useEffect(() => {
    getMatches();
  }, []);

  const getMatches = () => {
    Axios.get(`http://localhost:3001/api/matches/`, {
      headers: {
        minDate: "now",
      },
    }).then((res) => {
      if (res.data.got) {
        Axios.get("http://localhost:3001/api/types/", {
          headers: {
            userId: localStorage.getItem("user"),
          },
        }).then((response) => {
          if (response.data.get) {
            setUserTypes(response.data.data);
          } else {
            console.log(response.data.message);
          }
        });
        setMatchesToBet(res.data.data);
      } else {
        console.log(`https://betgit.wiktorrudzki.pl/api/matches/`);
      }
    });
  };

  return (
    <div style={{ width: "80%" }} className="admin-form-div">
      <h2 className="admin-form-title">Wprowadź wyniki meczów</h2>
      <div className="change-score-wrapper">
        {matchesToBet.map((match) => {
          let type = userTypes.find((type) => match.id === type.match_id);
          return <BetMatch key={match.id} match={match} type={type} />;
        })}
      </div>
    </div>
  );
};

export default UserHome;
