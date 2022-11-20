import { useReducer, useEffect, useState } from "react";
import Axios from "axios";
import "./styles.css";
import { addHours } from "date-fns";
import { newMatchReducer } from "./reducer/newMatchReducer";
import { Match } from "../types/Match";
import ChangeScoreAdmin from "./components/ChangeScoreAdmin";
import { User } from "../../../Ranking/types";
import { Type } from "../user/types";

const AdminHome = () => {
  const [newMatchStatus, dispatchNewMatchStatus] = useReducer(newMatchReducer, {
    team1: "",
    team2: "",
    matchTime: null,
  });

  const [allMatches, setAllMatches] = useState<Match[]>([]);
  const [allCorrectTypes, setAllCorrectTypes] = useState<Type[]>([]);
  const [showMatchesAfter, setShowMatchesAfter] = useState<string | null>(null);

  const addMatch = (e: React.FormEvent) => {
    e.preventDefault();

    if (
      newMatchStatus.team1 === "" ||
      newMatchStatus.team2 === "" ||
      newMatchStatus.matchTime === null
    ) {
      return;
    }

    Axios.post(
      `https://betgit.wiktorrudzki.pl/api/matches/add`,
      {
        team1: newMatchStatus.team1,
        team2: newMatchStatus.team2,
        matchTime: addHours(newMatchStatus.matchTime, 1),
      },
      {
        headers: {
          authorization: localStorage.getItem("token"),
        },
      }
    ).then((res) => {
      if (res.data.added) {
        Axios.get(`https://betgit.wiktorrudzki.pl/api/user/`).then((response) => {
          if (response.data.get) {
            response.data.data.forEach((user: User) => {
              Axios.post(
                `https://betgit.wiktorrudzki.pl/api/types/add`,
                {
                  team1: newMatchStatus.team1,
                  team2: newMatchStatus.team2,
                  userId: user.id,
                  matchId: res.data.matchId,
                },
                {
                  headers: {
                    authorization: localStorage.getItem("token"),
                  },
                }
              ).then((re) => {
                console.log(re);
                if (!re.data.added) {
                  console.log(re.data.message);
                }
              });
            });
          } else {
            console.log("failed to get users");
          }
        });
        dispatchNewMatchStatus({ type: "clear" });
        getMatches();
      } else {
        console.log(res.data.message);
      }
    });
  };

  useEffect(() => {
    getMatches();
    //eslint-disable-next-line
  }, []);

  const getMatches = () => {
    Axios.get(`https://betgit.wiktorrudzki.pl/api/matches/`, {
      headers: {
        minDate: showMatchesAfter,
      },
    }).then((res) => {
      if (res.data.got) {
        Axios.get(`https://betgit.wiktorrudzki.pl/api/correctTypes`, {
          headers: {
            authorization: localStorage.getItem("token"),
          },
        }).then((response) => {
          if (response.data.get) {
            setAllCorrectTypes(response.data.data);
          } else {
            console.log(response.data.message);
          }
        });
        setAllMatches(res.data.data);
      } else {
        console.log(res.data.message);
      }
    });
  };

  const filterMatches = () => {
    getMatches();
  };

  return (
    <div className="bet-admin-div">
      <div className="admin-form-div">
        <h2 className="admin-form-title">Wprowadź nowy mecz</h2>
        <form className="admin-form">
          <input
            value={newMatchStatus.team1}
            required
            className="form-input"
            onChange={(e) => {
              dispatchNewMatchStatus({
                type: "team1",
                payload: e.target.value,
              });
            }}
            placeholder="Drużyna 1"
            type="text"
          />
          <input
            value={newMatchStatus.team2}
            required
            className="form-input"
            onChange={(e) => {
              dispatchNewMatchStatus({
                type: "team2",
                payload: e.target.value,
              });
            }}
            placeholder="Drużyna 2"
            type="text"
          />
          <input
            onChange={(e) => {
              dispatchNewMatchStatus({
                type: "matchTime",
                payload: new Date(e.target.value),
              });
            }}
            required
            className="form-input"
            type="datetime-local"
          />
          <button
            onClick={addMatch}
            className={`submit-btn ${
              newMatchStatus.team1 === "" ||
              newMatchStatus.team2 === "" ||
              newMatchStatus.matchTime === null
                ? "disable-submit-btn"
                : ""
            }`}
            type="submit"
          >
            Dodaj nowy mecz
          </button>
        </form>
      </div>
      <div style={{ width: "80%" }} className="admin-form-div">
        <h2 className="admin-form-title">Wprowadź wyniki meczów</h2>
        <div className="change-score-wrapper">
          <input
            style={{ width: "30%" }}
            className="form-input"
            onChange={(e) => setShowMatchesAfter(e.target.value)}
            type="datetime-local"
          />
          <button
            style={{ width: "30%" }}
            className={`submit-btn ${
              showMatchesAfter === null ? "disable-submit-btn" : ""
            }`}
            onClick={filterMatches}
          >
            Filtruj
          </button>
          {allMatches.map((match) => {
            let correctType = allCorrectTypes.find((type) => match.id === type.match_id);
            return <ChangeScoreAdmin key={match.id} match={match} correctType={correctType} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default AdminHome;
