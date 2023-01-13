import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useUser } from "../../hooks/useUser";
import userIcon from "../../images/user.svg";
import PhoneNav from "./components/PhoneNav";
import "./styles.css";

const Nav = () => {
  const currentRoute = useLocation();
  const { currentUser } = useUser();
  const [phoneScreen, setPhoneScreen] = useState(false);

  const checkRoute = (route: string) => {
    return currentRoute.pathname === route;
  };

  useEffect(() => {
    function handleWindowResize() {
      if (getWindowSize().innerWidth > 786) setPhoneScreen(true);
      else setPhoneScreen(false);
      setWindowSize(getWindowSize());
    }

    window.addEventListener("resize", handleWindowResize);

    if (windowSize.innerWidth < 786) setPhoneScreen(false);
    else setPhoneScreen(true);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
    //eslint-disable-next-line
  }, []);

  const [windowSize, setWindowSize] = useState(getWindowSize());

  function getWindowSize() {
    const { innerWidth, innerHeight } = window;
    return { innerWidth, innerHeight };
  }

  console.log(currentRoute.pathname);

  return (
    <nav className="nav">
      {phoneScreen ? (
        <ul className="ul">
          <li className="li">
            <Link to="/" className="logo">
              Betgit
            </Link>

            <Link
              to="/"
              className={`${checkRoute("/") ? "link link-active" : "link"}`}
            >
              {currentUser?.isAdmin ? "Kontroluj grę" : "Obstawiaj"}
            </Link>
            {currentUser?.isAdmin ? (
              ""
            ) : (
              <Link
                to="/mojeBety"
                className={`${
                  checkRoute("/mojeBety") ? "link link-active" : "link"
                }`}
              >
                Moje bety
              </Link>
            )}
            <Link
              to="/ranking"
              className={`${checkRoute("/ranking") ? "link link-active" : "link"}`}
            >
              Ranking
            </Link>
          </li>
          {currentUser !== null ? (
            <li className="li">
              <div className="nav-user-wrapper">
                <img
                  style={{ width: "1.5em", padding: "0", margin: "0" }}
                  src={userIcon}
                  alt="user icon"
                />
                <h3 style={{ padding: "0", margin: "0" }}>
                  {currentUser.username}
                </h3>
              </div>
              <Link
                to="/wylogowanie"
                className={`${
                  checkRoute("/wylogowanie") ? "link link-active" : "link"
                }`}
              >
                Wyloguj się
              </Link>
            </li>
          ) : (
            <li className="li">
              <Link
                to="/logowanie"
                className={`${
                  checkRoute("/logowanie") ? "link link-active" : "link"
                }`}
              >
                Zaloguj się
              </Link>
              <Link
                to="/rejestracja"
                className={`${
                  checkRoute("/rejestracja") ? "link link-active" : "link"
                }`}
              >
                Zarejestruj się
              </Link>
            </li>
          )}
        </ul>
      ) : (
        <PhoneNav />
      )}
    </nav>
  );
};

export default Nav;
