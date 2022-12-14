import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Register+Login/Login";
import MyBets from "./components/MyBets";
import Nav from "./components/navigation";
import Ranking from "./components/Ranking";
import { useRoute } from "./hooks/useRoute";
import Register from "./components/Register+Login/Register";
import Logout from "./components/Logout";
import { useUser } from "./hooks/useUser";
import { useEffect } from "react";
import Axios from "axios";

import "./styles/form-styles/styles.css";
import "./styles/match-form-styles/styles.css";
import { useShowMenu } from "./hooks/useShowMenu";

function App() {
  const { setCurrentRoute } = useRoute();
  const { setCurrentUser } = useUser();

  const { setShowMenu } = useShowMenu();

  useEffect(() => {
    // http://localhost:3001/api/user/remember https://betgit.wiktorrudzki.pl/api/user/remember
    Axios.get(`https://betgit.wiktorrudzki.pl/api/user/remember`, {
      headers: {
        authorization: localStorage.getItem("token"),
      },
    }).then((res) => {
      if (res.data.auth) {
        setCurrentUser({
          username: res.data.username,
          id: res.data.id,
          isAdmin: res.data.isAdmin,
        });
      } else {
        console.log("failed to authenticate");
      }
    });
    //eslint-disable-next-line
  }, []);

  const handleClickOutsideNav = () => {
    setShowMenu(false);
  };

  return (
    <div className="App">
      <BrowserRouter>
        <Nav />
        <div onClick={() => handleClickOutsideNav()}>
          <Routes>
            <Route path="/" element={<Home changeRoute={setCurrentRoute} />} />
            <Route
              path="/mojeBety"
              element={<MyBets changeRoute={setCurrentRoute} />}
            />
            <Route
              path="/ranking"
              element={<Ranking changeRoute={setCurrentRoute} />}
            />
            <Route
              path="/rejestracja"
              element={<Register changeRoute={setCurrentRoute} />}
            />
            <Route
              path="/logowanie"
              element={<Login changeRoute={setCurrentRoute} />}
            />
            <Route
              path="/wylogowanie"
              element={<Logout changeRoute={setCurrentRoute} />}
            />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
