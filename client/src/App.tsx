import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import MyBets from "./components/MyBets";
import Nav from "./components/navigation";
import Ranking from "./components/Ranking";
import { useRoute } from "./hooks/useRoute";

function App() {
  const { setCurrentRoute } = useRoute();

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
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
