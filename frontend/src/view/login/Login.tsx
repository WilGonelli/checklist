import styles from "./login.module.css";
import MyButton from "../../components/button/MyButton";
import { useUser } from "../../viewmodel/user/UserViewModel";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { ToastContainer } from "react-toastify";

export default function Login() {
  const { email, setEmail, password, setPassword, login, isLogged } = useUser();
  const nav = useNavigate();

  useEffect(() => {
    if (isLogged) {
      nav("/checklist");
    }
  }, [isLogged, nav]);

  return (
    <div className={styles.container}>
      <div className={styles.loginContainer}>
        <h1 className={styles.loginTitle}>Login to SmartForklift</h1>
        <form className={styles.loginForm}>
          <label htmlFor="email" className={styles.loginFormLabel}>
            Email:
          </label>
          <input
            id="email"
            type="text"
            className={styles.loginFormInput}
            placeholder="Enter your username or email"
            value={email || ""}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label htmlFor="password" className={styles.loginFormLabel}>
            Password:
          </label>
          <input
            id="password"
            type="text"
            className={styles.loginFormInput}
            placeholder="Enter your password"
            value={password || ""}
            onChange={(e) => setPassword(e.target.value)}
          />
        </form>
        {/* <div className={styles.loginRecoveryPasswordContainer}>
          <a href="" className={styles.loginRecoveryPassword}>
            Forgot password?
          </a>
        </div> */}
        <MyButton
          variant="fullColor"
          alignText="center"
          handleClick={(e) => login(e)}
        >
          <p>Login</p>
        </MyButton>
      </div>
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}
