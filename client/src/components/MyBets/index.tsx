import { useEffect } from "react";

type Props = {
  changeRoute: React.Dispatch<React.SetStateAction<string>>;
};

const MyBets = ({ changeRoute }: Props) => {
  useEffect(() => {
    changeRoute("/mojeBety");
    //eslint-disable-next-line
  }, []);

  return <div>MyBets</div>;
};

export default MyBets;
