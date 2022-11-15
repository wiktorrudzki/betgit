import { useEffect } from "react";
import { useUser } from "../../hooks/useUser";
import AdminHome from "./components/admin/AdminHome";
import UserHome from "./components/user/UserHome";
import "./styles.css";

type Props = {
  changeRoute: React.Dispatch<React.SetStateAction<string>>;
};

const Home = ({ changeRoute }: Props) => {
  const { currentUser } = useUser();

  useEffect(() => {
    changeRoute("/");
    //eslint-disable-next-line
  }, []);

  return (
    <div className="home-page">
      {currentUser?.isAdmin ? <AdminHome /> : <UserHome />}
    </div>
  );
};

export default Home;
