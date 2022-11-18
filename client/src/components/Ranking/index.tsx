import { useEffect, useState } from "react";
import Axios from "axios";
import UserScore from "./components/UserScore";
import "./styles.css";
import { User } from "./types";

type Props = {
  changeRoute: React.Dispatch<React.SetStateAction<string>>;
};

const Ranking = ({ changeRoute }: Props) => {
  const [allUsers, setAllUsers] = useState<User[]>([]);

  useEffect(() => {
    changeRoute("/ranking");

    Axios.get(`http://localhost:3001/api/user/`).then((res: any) => {
      if (res.data.get) {
        setAllUsers(
          res.data.data.sort((a: User, b: User) => b.points - a.points)
        );
      } else {
        console.log("error while getting users");
      }
    });
    //eslint-disable-next-line
  }, []);

  return (
    <div className="ranking-wrapper">
      <div className="ranking">
        <div className="user-score category">
          <h2>Użytkownik</h2>
          <h2>Punkty</h2>
        </div>
        {allUsers.map((user: User, index: number) => {
          return <UserScore key={user.username} user={user} index={index} />;
        })}
      </div>
    </div>
  );
};

export default Ranking;
