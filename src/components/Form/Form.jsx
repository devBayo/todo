import { useState } from "react";
import { useTodo } from "../../contexts/TodoContext";
import Button from "../Button/Button";
import styles from "./Form.module.css";

function Form() {
  const [task, setTask] = useState("");
  const { addTask } = useTodo();

  function handleSubmit(e) {
    e.preventDefault();

    if (task) {
      addTask(task);
      setTask("");
    }
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.form_row}>
        <label htmlFor="todo">
          <ion-icon name="checkbox" class={styles.icon}></ion-icon>
        </label>
        <input
          value={task}
          onChange={(e) => setTask(e.target.value)}
          type="text"
          id="todo"
          placeholder="New todo"
        />
      </div>

      <Button>Add new task</Button>
    </form>
  );
}

export default Form;
