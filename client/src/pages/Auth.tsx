import React, { useState } from "react";
import { useNavigate } from "react-router";

import { useAuth } from "hooks/useAuth";
import useAxios from "hooks/useAxios";
import { ENDPOINTS } from "lib/constants";

import styles from "styles/auth.module.css";
import GoogleLogo from "assets/google.png";
import ErrorText from "components/ErrorText";
import Loading from "components/LoadingText";

interface User {
  id: string;
  email: string;
  username: string;
}

interface AuthSuccessResponse {
  token: string;
  user: User;
}

const Auth = () => {
  const navigate = useNavigate();
  const [loginMode, setLoginMode] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const { login } = useAuth();
  const { loading, error, fetchData } = useAxios();

  const registerOrLoginUser = async () => {
    const { data: response } = await fetchData<AuthSuccessResponse>(
      loginMode ? ENDPOINTS.auth.login : ENDPOINTS.auth.register,
      "post",
      {
        email,
        password,
        username,
      }
    );

    if (response) {
      login(response.user, response.token);
      return true;
    }

    return false;
  };

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const success = await registerOrLoginUser();
    if (success) {
      navigate("/", { replace: true });
    } else {
      console.log("Something went wrong");
    }
  };

  return (
    <main className={styles["content"]}>
      <form onSubmit={submitHandler} className={styles["auth-form"]}>
        {!loginMode && (
          <input
            type="text"
            id="username"
            placeholder="Username"
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        )}
        <input
          type="email"
          id="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          id="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <p className={styles["switch-text"]}>
          {loginMode
            ? "Don't have an account ? "
            : "Already have an account ? "}
          <button type="button" onClick={() => setLoginMode(!loginMode)}>
            {loginMode ? "Signup instead" : "Login instead"}
          </button>
        </p>
        <button
          className={`${styles["login-btn"]} ${styles["btn"]}`}
          type="submit"
        >
          Submit
        </button>
        <p className={styles["or-text"]}>OR</p>
        <button
          className={`${styles["google-btn"]} ${styles["btn"]}`}
          type="button"
        >
          <img src={GoogleLogo} alt="Google Logo" />
          {loginMode ? "Login with Google" : "Signup with Google"}
        </button>
        <Loading loading={loading} />
        <ErrorText error={error} />
      </form>
    </main>
  );
};

export default Auth;
