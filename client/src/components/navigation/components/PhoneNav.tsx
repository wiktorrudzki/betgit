import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { useRoute } from "../../../hooks/useRoute";
import { useUser } from "../../../hooks/useUser";
import userIcon from "../../../images/user.svg";
import barsIcon from "../../../images/bars.svg";
import xIcon from "../../../images/x.svg";
import "./phone-nav.css";

const PhoneNav = () => {
  const { currentRoute } = useRoute();
  const { currentUser } = useUser();

  const [showMenu, setShowMenu] = useState(false);
  const phoneNavRef = useRef<null | HTMLDivElement>(null);

  useEffect(() => {
    setShowMenu(false);
    if (phoneNavRef.current) {
      phoneNavRef.current.style.animation =
        "hide-nav 0.8s ease-in-out forwards";
    }
    //eslint-disable-next-line
  }, [currentRoute]);

  const checkRoute = (route: string) => {
    if (route === "/") {
      return currentRoute === route;
    } else {
      return currentRoute.includes(route);
    }
  };

  return (
    <ul className="ul">
      <li className="li">
        <Link to="/" className="logo">
          Betgit
        </Link>
      </li>
      <li className="li">
        <img
          onClick={() => {
            setShowMenu((prev) => !prev);
            if (phoneNavRef.current) {
              if (showMenu) {
                phoneNavRef.current.style.animation =
                  "hide-nav 0.8s ease-in-out forwards";
              } else {
                phoneNavRef.current.style.animation =
                  "animate-nav 0.8s ease-in-out forwards";
              }
            }
          }}
          className="bars-icon"
          src={showMenu ? xIcon : barsIcon}
          alt="menu toggler"
        />
      </li>
      <div
        ref={phoneNavRef}
        className="phone-nav"
        // ${showMenu ? "nav-animation" : ""}
      >
        <ul className="ul-phone">
          <li className="li-phone">
            <Link
              to="/"
              className={`${checkRoute("/") ? "link-active" : "link"}`}
            >
              {currentUser?.isAdmin ? "Kontroluj grę" : "Obstawiaj"}
            </Link>
            {currentUser?.isAdmin ? (
              ""
            ) : (
              <Link
                to="/mojeBety"
                className={`${
                  checkRoute("/mojeBety") ? "link-active" : "link"
                }`}
              >
                Moje bety
              </Link>
            )}
            <Link
              to="/ranking"
              className={`${checkRoute("/ranking") ? "link-active" : "link"}`}
            >
              Ranking
            </Link>
          </li>
          {currentUser !== null ? (
            <li className="li-phone">
              <div className="nav-user-wrapper">
                <img
                  style={{ width: "1.2em" }}
                  src={userIcon}
                  alt="user icon"
                />
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
            <li className="li-phone">
              <Link
                to="/logowanie"
                className={`${
                  checkRoute("/logowanie") ? "link-active" : "link"
                }`}
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
      </div>
    </ul>
  );
};

export default PhoneNav;
