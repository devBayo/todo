import { Link, useNavigate } from "react-router-dom";

import Button from "../Button/Button";
import styles from "./Auth.module.css";
import { useEffect, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";

function Auth({ title, type }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const { login, signup, error, loading, token } = useAuth();

  function handleSubmit(e) {
    e.preventDefault();

    if (type === "Sign up") signup(email, password);
    if (type === "Login") login(email, password);
    setEmail("");
    setPassword("");
  }

  useEffect(
    function () {
      if (token) navigate("/todos", { replace: true });
    },
    [token, navigate]
  );

  return (
    <section className={styles["auth-section"]}>
      <form className={styles["form"]} onSubmit={handleSubmit}>
        <h2 className={styles["form-title"]}>{title}</h2>
        {error && <p className={styles.error}>{error}</p>}

        <div className={styles["form-group"]}>
          <label className={styles["form-label"]} htmlFor="password">
            Input Your Email
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="example@email.com"
            id="password"
            className={styles["form-input"]}
            required
          />
        </div>
        <div className={`${styles["form-group"]} ${styles["form-group_p"]}`}>
          <label className={styles["form-label"]} htmlFor="confirm-password">
            Password
          </label>
          <input
            className={styles["form-input"]}
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="**********"
            id="confirm-password"
            required
          />
        </div>

        <Button>{loading ? "Loading..." : type}</Button>

        <div className={styles["form-group"]}>
          <div className={styles["form-alt"]}></div>

          {type === "Login" && (
            <p className={styles["form-auth-alt-option"]}>
              Are you a new user?{" "}
              <Link className={styles["form-link"]} to="/sign-up">
                Sign up
              </Link>
            </p>
          )}

          {type === "Sign up" && (
            <p className={styles["form-auth-alt-option"]}>
              Already have an account?{" "}
              <Link className={styles["form-link"]} to="/login">
                Log in
              </Link>
            </p>
          )}
        </div>
      </form>
    </section>
  );
}

export default Auth;
