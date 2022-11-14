import { useUser } from "../../../hooks/useUser";

type User = {
  username: string;
  points: number;
};

type Props = {
  user: User;
  index: number;
};

const UserScore = ({ user, index }: Props) => {
  const { currentUser } = useUser();

  return (
    <div
      className="user-score"
      style={
        index === 0
          ? { color: "gold" }
          : index === 1
          ? { color: "silver" }
          : index === 2
          ? { color: "brown" }
          : {}
      }
    >
      <h2>
        {user.username}
        {currentUser && currentUser.username === user.username ? " (Ty)" : ""}
      </h2>
      <h2>{user.points}</h2>
    </div>
  );
};

export default UserScore;
