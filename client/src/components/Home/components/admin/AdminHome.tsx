import { useReducer, useEffect, useState } from "react";
import Axios from "axios";
import "./styles.css";
import { addHours } from "date-fns";
import { newMatchReducer } from "./reducer/newMatchReducer";
import { Match } from "./types/Match";
import ChangeScore from "./components/ChangeScore";

const AdminHome = () => {
  const [newMatchStatus, dispatchNewMatchStatus] = useReducer(newMatchReducer, {
    team1: "",
    team2: "",
    matchTime: null,
  });

  const [allMatches, setAllMatches] = useState<Match[]>([]);

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
      "http://localhost:3001/matches/add",
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
        dispatchNewMatchStatus({ type: "clear" });
        getMatches();
      } else {
        console.log(res.data.message);
      }
    });
  };

  useEffect(() => {
    getMatches();
  }, []);

  const getMatches = () => {
    Axios.get("http://localhost:3001/matches/").then((res) => {
      if (res.data.got) {
        setAllMatches(res.data.data);
      } else {
        console.log(res.data.message);
      }
    });
  };

  return (
    <div className="bet-admin-div">
      <div className="admin-form-div">
        <h2 className="admin-form-title">Wprowadź nowy mecz</h2>
        <form className="admin-form">
          <input
            value={newMatchStatus.team1}
            required
            style={{ width: "60%" }}
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
            style={{ width: "60%" }}
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
            style={{ width: "60%" }}
            required
            className="form-input"
            type="datetime-local"
          />
          <button
            onClick={addMatch}
            style={{ width: "60%" }}
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
          {allMatches.map((match) => {
            return <ChangeScore key={match.id} match={match} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default AdminHome;
