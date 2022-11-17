import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../hooks/useUser";
import "./styles.css";

type Props = {
  changeRoute: React.Dispatch<React.SetStateAction<string>>;
};

const Logout = ({ changeRoute }: Props) => {
  const { setCurrentUser } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    changeRoute("/wylogowanie");
    //eslint-disable-next-line
  }, []);

  const logoutUser = () => {
    localStorage.clear();
    setCurrentUser(null);
    navigate("/");
  };

  return (
    <div className="logout-wrapper">
      <h2
        className="logo"
        style={{ padding: "0", fontSize: "3em", cursor: "initial" }}
      >
        Betgit
      </h2>
      <button onClick={logoutUser} className="logout-btn">
        Wyloguj się
      </button>
    </div>
  );
};

export default Logout;
