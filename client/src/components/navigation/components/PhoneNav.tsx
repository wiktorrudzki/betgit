import { useRef, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useUser } from "../../../hooks/useUser";
import userIcon from "../../../images/user.svg";
import barsIcon from "../../../images/bars.svg";
import xIcon from "../../../images/x.svg";
import "./phone-nav.css";
import { useShowMenu } from "../../../hooks/useShowMenu";

const PhoneNav = () => {
  const currentRoute = useLocation();
  const { currentUser } = useUser();

  const { showMenu, setShowMenu } = useShowMenu();

  // const [showMenu, setShowMenu] = useState(false);
  const phoneNavRef = useRef<null | HTMLDivElement>(null);

  useEffect(() => {
    setShowMenu(false);
    //eslint-disable-next-line
  }, [currentRoute.pathname]);

  useEffect(() => {
    if (!showMenu) {
      hideMenu();
    }
    //eslint-disable-next-line
  }, [showMenu]);

  const checkRoute = (route: string) => {
    return currentRoute.pathname === route;
  };

  const hideMenu = () => {
    if (phoneNavRef.current) {
      phoneNavRef.current.style.animation =
        "hide-nav 0.8s ease-in-out forwards";
      setShowMenu(false);
    }
  };

  return (
    <ul className="ul">
      <li className="li">
        <Link onClick={hideMenu} to="/" className="logo">
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
                if (phoneNavRef.current) {
                  phoneNavRef.current.style.display = "initial";
                }
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
              onClick={hideMenu}
              to="/"
              className={`${checkRoute("/") ? "link link-active" : "link"}`}
            >
              {currentUser?.isAdmin ? "Kontroluj grę" : "Obstawiaj"}
            </Link>
            {currentUser?.isAdmin ? (
              ""
            ) : (
              <Link
                onClick={hideMenu}
                to="/mojeBety"
                className={`${
                  checkRoute("/mojeBety") ? "link link-active" : "link"
                }`}
              >
                Moje bety
              </Link>
            )}
            <Link
              onClick={hideMenu}
              to="/ranking"
              className={`${
                checkRoute("/ranking") ? "link link-active" : "link"
              }`}
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
                onClick={hideMenu}
                to="/wylogowanie"
                className={`${
                  checkRoute("/wylogowanie") ? "link link-active" : "link"
                }`}
              >
                Wyloguj się
              </Link>
            </li>
          ) : (
            <li className="li-phone">
              <Link
                onClick={hideMenu}
                to="/logowanie"
                className={`${
                  checkRoute("/logowanie") ? "link link-active" : "link"
                }`}
              >
                Zaloguj się
              </Link>
              <Link
                onClick={hideMenu}
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
      </div>
    </ul>
  );
};

export default PhoneNav;
