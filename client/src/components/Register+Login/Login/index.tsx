import Axios from "axios";
import React, { useEffect, useReducer } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../../hooks/useUser";
import "../styles.css";
import Wrapper from "../Wrapper";

type Props = {
  changeRoute: React.Dispatch<React.SetStateAction<string>>;
};

type LoginStatus = {
  username: string;
  password: string;
  error: boolean;
  errorMessage: string;
};

type Actions =
  | { type: "username"; payload: string }
  | { type: "password"; payload: string }
  | { type: "error"; payload: boolean; errorMessage: string }
  | { type: "clear" };

const Login = ({ changeRoute }: Props) => {
  const { setCurrentUser } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    changeRoute("/logowanie");
    //eslint-disable-next-line
  }, []);

  const loginStatusReducer = (
    state: LoginStatus,
    action: Actions
  ): LoginStatus => {
    switch (action.type) {
      case "username":
        return { ...state, username: action.payload };
      case "password":
        return { ...state, password: action.payload };

      case "error":
        return {
          ...state,
          error: action.payload,
          errorMessage: action.errorMessage,
        };
      case "clear":
        return { username: "", password: "", error: false, errorMessage: "" };
      default:
        return state;
    }
  };

  const [loginStatus, dispatchLoginStatus] = useReducer(loginStatusReducer, {
    username: "",
    password: "",
    error: false,
    errorMessage: "",
  });

  const submitForm = (e: React.FormEvent) => {
    e.preventDefault();

    Axios.post("http://localhost:3001/login", {
      username: loginStatus.username,
      password: loginStatus.password,
    }).then((res) => {
      if (res.data.logged) {
        dispatchLoginStatus({ type: "clear" });
        setCurrentUser({
          username: res.data.username,
          id: res.data.id,
          isAdmin: res.data.isAdmin,
        });
        localStorage.setItem("token", "Bearer " + res.data.token);
        localStorage.setItem("user", res.data.id);
        navigate("/");
      } else {
        dispatchLoginStatus({
          type: "error",
          payload: true,
          errorMessage: res.data.message,
        });
      }
    });
  };

  const alternative = {
    text: "Nie posiadasz jeszcze konta?",
    button: "Zarejestruj się",
  };

  return (
    <Wrapper alternative={alternative}>
      <form className="form" onSubmit={submitForm}>
        <h3 className="form-title">Zaloguj</h3>
        <input
          required
          className="form-input"
          autoComplete="username"
          type="text"
          value={loginStatus.username}
          placeholder="Nazwa użytkownika"
          onChange={(e) => {
            dispatchLoginStatus({
              type: "username",
              payload: e.target.value,
            });
          }}
        />
        <input
          required
          className="form-input"
          autoComplete="new-password"
          type="password"
          value={loginStatus.password}
          placeholder="Wpisz hasło"
          onChange={(e) => {
            dispatchLoginStatus({
              type: "password",
              payload: e.target.value,
            });
          }}
        />
        {loginStatus.error && (
          <span style={{ color: "red" }}>{loginStatus.errorMessage}</span>
        )}
        <button
          disabled={loginStatus.username === "" || loginStatus.password === ""}
          className={`submit-btn ${
            loginStatus.username === "" || loginStatus.password === ""
              ? "disable-submit-btn"
              : ""
          }`}
          type="submit"
        >
          Zaloguj się
        </button>
      </form>
    </Wrapper>
  );
};

export default Login;
