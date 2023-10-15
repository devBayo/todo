import { useTodo } from "../../contexts/TodoContext";
import styles from "./TodoItem.module.css";

function TodoItem({ task }) {
  const { deleteTask, toggleCompleted } = useTodo();

  function handleDelete() {
    deleteTask(task._id);
  }

  function handleToggle() {
    toggleCompleted(task._id);
  }

  return (
    <li className={styles.todoitem}>
      <span className={`${task.completed ? styles.completed : ""}`}>
        {task.title}
      </span>

      <span className={styles.icon_container}>
        <input
          onClick={handleToggle}
          type="checkbox"
          className={styles.check_icon}
        />
        <ion-icon
          name="trash-sharp"
          class={`${styles.icon} ${styles.delete_icon}`}
          onClick={handleDelete}
        ></ion-icon>
      </span>

      <p className={styles.time_details}>
        <span>
          Created {new Date(task.createdAt).toDateString()} | Updated at{" "}
          {new Date(task.updatedAt).toDateString()}
        </span>
      </p>
    </li>
  );
}

export default TodoItem;
