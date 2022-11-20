import { Type } from "../../Home/components/user/types";

type Props = {
  type: Type;
};

const UserType = ({ type }: Props) => {
  return (
    <div className="mybets-row">
      <div className="my-bets-row-teams mybets-row-child">
        <h4>{type.team1}</h4>
        <span> - </span>
        <h4>{type.team2}</h4>
      </div>
      <div className="mybets-row-score mybets-row-child">
        <p>{type.team1_score}</p>
        <span> : </span>
        <p>{type.team2_score}</p>
      </div>
      <div
        className="mybets-row-points mybets-row-child"
        style={
          type.points === 4
            ? { color: "blue" }
            : type.points === 3
            ? { color: "green" }
            : type.points === 2
            ? { color: "orange" }
            : type.points === 0
            ? { color: "red" }
            : { color: "black" }
        }
      >
        {type.points}
      </div>
    </div>
  );
};

export default UserType;
