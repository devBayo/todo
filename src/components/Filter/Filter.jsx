import Button from "../Button/Button";
import styles from "./Filter.module.css";

function Filter() {
  return (
    <div className={styles.filter}>
      <Button>All</Button>
      <Button>Important</Button>
      <Button>Done</Button>
    </div>
  );
}

export default Filter;
