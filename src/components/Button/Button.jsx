import styles from "./Button.module.css";

function Button({ children, type = "primary", onClick }) {
  return (
    <button
      className={`${
        type === "secondary" ? styles.btn_secondary : styles.btn_primary
      } ${styles.button}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default Button;
