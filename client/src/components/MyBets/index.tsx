import Axios from "axios";
import { useRef, useState } from "react";
import { useEffect } from "react";
import { useUser } from "../../hooks/useUser";
import { Type } from "../Home/components/user/types";
import UserType from "./components/UserType";
import "./styles.css";

const MyBets = () => {
  const { currentUser } = useUser();
  const [userTypes, setUserTypes] = useState<Type[]>([]);
  const [userTypesFiltered, setUserTypesFiltered] = useState<Type[]>([]);
  const firstTeamFilterRef = useRef<null | HTMLInputElement>(null);
  const secondTeamFilterRef = useRef<null | HTMLInputElement>(null);

  const getUserTypes = () => {
    Axios.get("https://betgit.wiktorrudzki.pl/api/types/getByUserId", {
      headers: {
        authorization: localStorage.getItem("token"),
        userId: localStorage.getItem("user"),
      },
    }).then((res) => {
      if (res.data.taken) {
        setUserTypes(
          res.data.data.filter((type: Type) => type.points !== null)
        );
        setUserTypesFiltered(
          res.data.data.filter((type: Type) => type.points !== null)
        );
      } else {
        console.log(res.data.message);
      }
    });
  };

  const filterUserTypes = (
    e: React.ChangeEvent<HTMLInputElement>,
    team: number
  ) => {
    console.log("pierwszy" + firstTeamFilterRef.current?.value);
    console.log("drugi" + secondTeamFilterRef.current?.value);
    setUserTypesFiltered(() => {
      if (team === 1 && e.target.value !== "") {
        return userTypes.filter((type) =>
          secondTeamFilterRef.current?.value
            ? type.team1.toLowerCase().includes(e.target.value.toLowerCase()) &&
              type.team2
                .toLowerCase()
                .includes(secondTeamFilterRef.current?.value)
            : type.team1.toLowerCase().includes(e.target.value.toLowerCase())
        );
      } else if (team === 1) {
        return userTypes.filter((type) =>
          secondTeamFilterRef.current?.value
            ? type.team2
                .toLowerCase()
                .includes(secondTeamFilterRef.current?.value)
            : true
        );
      } else if (team === 2 && e.target.value !== "") {
        return userTypes.filter((type) =>
          firstTeamFilterRef.current?.value
            ? type.team2.toLowerCase().includes(e.target.value.toLowerCase()) &&
              type.team1
                .toLowerCase()
                .includes(firstTeamFilterRef.current?.value)
            : type.team2.toLowerCase().includes(e.target.value.toLowerCase())
        );
      } else {
        return userTypes.filter((type) =>
          firstTeamFilterRef.current?.value
            ? type.team1
                .toLowerCase()
                .includes(firstTeamFilterRef.current?.value)
            : true
        );
      }
    });
  };

  useEffect(() => {
    let loaded = true;
    if (loaded) getUserTypes();

    return () => {
      loaded = false;
    };
  }, []);

  return (
    <div className="myBets-page">
      {currentUser ? (
        <div className="mybets-wrapper">
          <h2 className="mybets-title">Twoje bety</h2>
          <h2 className="mybets-filter-title">Filtruj mecze</h2>
          <form className="mybets-filter-div">
            <input
              ref={firstTeamFilterRef}
              required
              className="form-input"
              type="text"
              onChange={(e) => filterUserTypes(e, 1)}
            />
            <span> - </span>
            <input
              ref={secondTeamFilterRef}
              required
              className="form-input"
              type="text"
              onChange={(e) => filterUserTypes(e, 2)}
            />
          </form>
          <ul className="mybets-columns-title">
            <li className="mybets-columns-title-child">Drużyny</li>
            <li className="mybets-columns-title-child">Twój typ</li>
            <li className="mybets-columns-title-child">Punkty</li>
          </ul>
          <div className="mybets-row-wrapper">
            {userTypesFiltered.map((type) => {
              return <UserType key={type.id} type={type} />;
            })}
          </div>
        </div>
      ) : (
        <div style={{ textAlign: "center" }}>
          Zaloguj się aby móc obstawiać i przeglądać swoje bety
        </div>
      )}
    </div>
  );
};

export default MyBets;
