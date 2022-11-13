import { useEffect } from "react";
import "./styles.css";

type Props = {
  changeRoute: React.Dispatch<React.SetStateAction<string>>;
};

const Home = ({ changeRoute }: Props) => {
  useEffect(() => {
    changeRoute("/");
    //eslint-disable-next-line
  }, []);

  return <div className="home-page"></div>;
};

export default Home;
