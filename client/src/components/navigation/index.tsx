import { Link } from "react-router-dom";
import { useRoute } from "../../hooks/useRoute";
import { useUser } from "../../hooks/useUser";
import userIcon from "../../images/user.svg";
import "./styles.css";

const Nav = () => {
  const { currentRoute } = useRoute();
  const { currentUser } = useUser();

  const checkRoute = (route: string) => {
    if (route === "/") {
      return currentRoute === route;
    } else {
      return currentRoute.includes(route);
    }
  };

  return (
    <nav className="nav">
      <ul className="ul">
        <li className="li">
          <Link to="/" className="logo">
            Betgit
          </Link>
          <Link
            to="/"
            className={`${checkRoute("/") ? "link-active" : "link"}`}
          >
            Obstawiaj
          </Link>
          <Link
            to="/mojeBety"
            className={`${checkRoute("/mojeBety") ? "link-active" : "link"}`}
          >
            Moje bety
          </Link>
          <Link
            to="/ranking"
            className={`${checkRoute("/ranking") ? "link-active" : "link"}`}
          >
            Ranking
          </Link>
        </li>
        {currentUser !== null ? (
          <li className="li">
            <div className="nav-user-wrapper">
              <img style={{ width: "1.5em" }} src={userIcon} alt="user icon" />
              <h3>{currentUser.username}</h3>
            </div>
            <Link
              to="/wylogowanie"
              className={`${
                checkRoute("/wylogowanie") ? "link-active" : "link"
              }`}
            >
              Wyloguj się
            </Link>
          </li>
        ) : (
          <li className="li">
            <Link
              to="/logowanie"
              className={`${checkRoute("/logowanie") ? "link-active" : "link"}`}
            >
              Zaloguj się
            </Link>
            <Link
              to="/rejestracja"
              className={`${
                checkRoute("/rejestracja") ? "link-active" : "link"
              }`}
            >
              Zarejestruj się
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Nav;
