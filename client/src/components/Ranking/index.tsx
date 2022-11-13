import { useEffect } from "react";

type Props = {
  changeRoute: React.Dispatch<React.SetStateAction<string>>;
};

const Ranking = ({ changeRoute }: Props) => {
  useEffect(() => {
    changeRoute("/ranking");
    //eslint-disable-next-line
  }, []);

  return <div>Ranking</div>;
};

export default Ranking;
