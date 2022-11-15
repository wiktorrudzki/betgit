import Axios from "axios";
import React, { useEffect, useReducer } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../../hooks/useUser";
import "../styles.css";
import Wrapper from "../Wrapper";

type Props = {
  changeRoute: React.Dispatch<React.SetStateAction<string>>;
};

type RegisterStatus = {
  username: string;
  password: string;
  error: boolean;
  errorMessage: string;
  confirmPassword: string;
};

type Actions =
  | { type: "username"; payload: string }
  | { type: "password"; payload: string }
  | { type: "confirmPassword"; payload: string }
  | { type: "error"; payload: boolean; errorMessage: string }
  | { type: "clear" };

const Register = ({ changeRoute }: Props) => {
  const { setCurrentUser } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    changeRoute("/rejestracja");
    //eslint-disable-next-line
  }, []);

  const registerStatusReducer = (
    state: RegisterStatus,
    action: Actions
  ): RegisterStatus => {
    switch (action.type) {
      case "username":
        return { ...state, username: action.payload };
      case "password":
        if (action.payload === state.confirmPassword) {
          return {
            ...state,
            password: action.payload,
            error: false,
            errorMessage: "",
          };
        } else {
          return { ...state, password: action.payload };
        }

      case "confirmPassword":
        if (action.payload === state.password) {
          return {
            ...state,
            confirmPassword: action.payload,
            error: false,
            errorMessage: "",
          };
        } else {
          return { ...state, confirmPassword: action.payload };
        }

      case "error":
        return {
          ...state,
          error: action.payload,
          errorMessage: action.errorMessage,
        };

      case "clear":
        return {
          username: "",
          password: "",
          confirmPassword: "",
          error: false,
          errorMessage: "",
        };
      default:
        return state;
    }
  };

  const [registerStatus, dispatchRegisterStatus] = useReducer(
    registerStatusReducer,
    {
      username: "",
      password: "",
      confirmPassword: "",
      error: false,
      errorMessage: "",
    }
  );

  const submitForm = (e: React.FormEvent) => {
    e.preventDefault();

    if (registerStatus.error) return;

    if (registerStatus.password !== registerStatus.confirmPassword) {
      dispatchRegisterStatus({
        type: "error",
        payload: true,
        errorMessage: "hasła różnią się od siebie",
      });
      return;
    }

    Axios.post("http://localhost:3001/register", {
      username: registerStatus.username,
      password: registerStatus.password,
      confirmPassword: registerStatus.confirmPassword,
    }).then((res) => {
      if (res.data.created) {
        Axios.post("http://localhost:3001/login", {
          username: registerStatus.username,
          password: registerStatus.password,
        }).then((res) => {
          setCurrentUser({
            username: res.data.username,
            id: res.data.id,
            isAdmin: res.data.isAdmin,
          });
          localStorage.setItem("token", "Bearer " + res.data.token);
          localStorage.setItem("user", res.data.id);
        });
        dispatchRegisterStatus({ type: "clear" });
        navigate("/");
      } else {
        dispatchRegisterStatus({
          type: "error",
          payload: true,
          errorMessage: res.data.message,
        });
      }
    });
  };

  const alternative = {
    text: "Posiadasz już konto?",
    button: "Zaloguj się",
  };

  return (
    <Wrapper alternative={alternative}>
      <form className="form" onSubmit={submitForm}>
        <h3 className="form-title">Zarejestruj</h3>
        <input
          required
          className="form-input"
          autoComplete="username"
          type="text"
          value={registerStatus.username}
          placeholder="Nazwa użytkownika"
          onChange={(e) => {
            dispatchRegisterStatus({
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
          value={registerStatus.password}
          placeholder="Wpisz hasło"
          onChange={(e) => {
            dispatchRegisterStatus({
              type: "password",
              payload: e.target.value,
            });
          }}
        />
        <input
          required
          className="form-input"
          autoComplete="new-password"
          type="password"
          value={registerStatus.confirmPassword}
          placeholder="Potwierdź hasło"
          onChange={(e) => {
            dispatchRegisterStatus({
              type: "confirmPassword",
              payload: e.target.value,
            });
          }}
        />
        {registerStatus.error && <span>{registerStatus.errorMessage}</span>}
        <button
          disabled={
            registerStatus.username === "" ||
            registerStatus.password === "" ||
            registerStatus.confirmPassword === ""
          }
          className={`submit-btn ${
            registerStatus.username === "" ||
            registerStatus.password === "" ||
            registerStatus.confirmPassword === ""
              ? "disable-submit-btn"
              : ""
          }`}
          type="submit"
        >
          Zarejestruj się
        </button>
      </form>
    </Wrapper>
  );
};

export default Register;
