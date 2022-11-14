import { Link } from "react-router-dom";

type Props = {
  children: JSX.Element;
  alternative: Alternative;
};

type Alternative = {
  text: string;
  button: string;
};

const Wrapper = ({ children, alternative }: Props) => {
  return (
    <div className="form-wrapper">
      <h2
        className="logo"
        style={{ padding: "0", fontSize: "3em", cursor: "initial" }}
      >
        Betgit
      </h2>
      {children}
      <div className="alternative-option">
        <p className="form-alternative-option">{alternative.text}</p>
        <h4>
          <Link
            to={
              alternative.button === "Zaloguj się"
                ? "/logowanie"
                : "/rejestracja"
            }
            className="form-link"
          >
            {alternative.button}
          </Link>
        </h4>
      </div>
    </div>
  );
};

export default Wrapper;
