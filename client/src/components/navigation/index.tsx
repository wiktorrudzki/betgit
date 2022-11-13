import { Link } from "react-router-dom";
import { useRoute } from "../../hooks/useRoute";
import "./styles.css";

const Nav = () => {
  const { currentRoute } = useRoute();

  const checkRoute = (route: string) => {
    if (route === "/") {
      console.log(currentRoute === route);
      return currentRoute === route;
    } else {
      console.log(currentRoute.includes(route));
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
        <li className="li">
          <Link to="/" className="link">
            Zaloguj się
          </Link>
          <Link to="/" className="link">
            Zarejestruj się
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
