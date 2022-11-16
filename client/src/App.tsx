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

function App() {
  const { setCurrentRoute } = useRoute();
  const { setCurrentUser } = useUser();

  useEffect(() => {
    Axios.get("http://localhost:3001/user/remember", {
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

  return (
    <div className="App">
      <BrowserRouter>
        <Nav />
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
      </BrowserRouter>
    </div>
  );
}

export default App;
