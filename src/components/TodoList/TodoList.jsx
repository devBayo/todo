import { useTodo } from "../../contexts/TodoContext";
import Button from "../Button/Button";
import TodoItem from "../TodoItem/TodoItem";
import styles from "./TodoList.module.css";

function TodoList() {
  const { tasks, clearTasks } = useTodo();

  return (
    <div>
      <ul className={styles.todolist}>
        {tasks && tasks.map((task) => <TodoItem task={task} key={task._id} />)}
      </ul>

      <div className={styles.todolist_btns}>
        <Button type="secondary">Delete completed tasks</Button>
        <Button type="secondary" onClick={clearTasks}>
          Delete all tasks
        </Button>
      </div>
    </div>
  );
}

export default TodoList;
