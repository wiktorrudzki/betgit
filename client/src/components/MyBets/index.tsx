import Axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { useUser } from "../../hooks/useUser";
import { Type } from "../Home/components/user/types";
import UserType from "./components/UserType";
import "./styles.css";

type Props = {
  changeRoute: React.Dispatch<React.SetStateAction<string>>;
};

const MyBets = ({ changeRoute }: Props) => {
  const { currentUser } = useUser();
  const [userTypes, setUserTypes] = useState<Type[]>([]);

  const getUserTypes = () => {
    Axios.get("http://localhost:3001/api/types/getByUserId", {
      headers: {
        authorization: localStorage.getItem("token"),
        userId: localStorage.getItem("user"),
      },
    }).then((res) => {
      if (res.data.taken) {
        setUserTypes(
          res.data.data.filter(
            (type: Type) =>
              type.team1_score !== null && type.team2_score !== null
          )
        );
      } else {
        console.log(res.data.message);
      }
    });
  };

  useEffect(() => {
    changeRoute("/mojeBety");

    getUserTypes();

    //eslint-disable-next-line
  }, []);

  return (
    <div className="myBets-page">
      {currentUser ? (
        <div className="mybets-wrapper">
          <h2 className="mybets-title">Twoje bety</h2>
          <ul className="mybets-columns-title">
            <li className="mybets-columns-title-child">Drużyny</li>
            <li className="mybets-columns-title-child">Twój typ</li>
            <li className="mybets-columns-title-child">Punkty</li>
          </ul>
          <div className="mybets-row-wrapper">
            {userTypes.map((type) => {
              return <UserType type={type} />;
            })}
          </div>
        </div>
      ) : (
        <div>Zaloguj się aby móc obstawiać i przeglądać swoje bety</div>
      )}
    </div>
  );
};

export default MyBets;
