import { useEffect, useState } from "react";
import Axios from "axios";

type Props = {
  changeRoute: React.Dispatch<React.SetStateAction<string>>;
};

type Users = {
  username: string;
  points: number;
};

const Ranking = ({ changeRoute }: Props) => {
  const [allUsers, setAllUsers] = useState<Users[]>([]);

  useEffect(() => {
    changeRoute("/ranking");

    Axios.get("http://localhost:3001/").then((res: any) => {
      if (res.data.get) {
        setAllUsers(res.data.data);
      } else {
        console.log("error while getting users");
      }
    });
    //eslint-disable-next-line
  }, []);

  return (
    <div>
      {allUsers.map((user: Users) => {
        return (
          <div key={user.username}>
            <h2>
              User: {user.username} Points: {user.points}
            </h2>
          </div>
        );
      })}
    </div>
  );
};

export default Ranking;
