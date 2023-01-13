import { useLocation } from "react-router-dom";
import { useUser } from "../../hooks/useUser";
import AdminHome from "./components/admin/AdminHome";
import UserHome from "./components/user/UserHome";
import "./styles.css";

const Home = () => {
  const { currentUser } = useUser();

  const location = useLocation();
  console.log(location.pathname);

  return (
    <div className="home-page">
      {currentUser?.isAdmin ? <AdminHome /> : <UserHome />}
    </div>
  );
};

export default Home;
