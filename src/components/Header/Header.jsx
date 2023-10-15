import { useAuth } from "../../contexts/AuthContext";
import Button from "../Button/Button";
import styles from "./Header.module.css";

function Header() {
  const { logout } = useAuth();

  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <h1 className={styles.title}>
          <span className={styles.logo}></span>Todo
        </h1>

        <div className={styles.btn}>
          <Button type="secondary" onClick={logout}>
            Logout
          </Button>
        </div>
      </nav>
    </header>
  );
}

export default Header;
