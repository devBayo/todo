import { createContext, useCallback, useContext, useState } from "react";
import { useAuth } from "./AuthContext";

const TodoContext = createContext();

const baseURL = "https://api-todo-9rux.onrender.com/api/v1";

function TodoProvider({ children }) {
  const [tasks, setTasks] = useState([]);
  const { token } = useAuth();

  const getTasks = useCallback(
    async function getTasks() {
      const response = await fetch(`${baseURL}/todos`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const jsonData = await response.json();

      setTasks([...jsonData.todos.reverse()]);
    },
    [token]
  );

  function deleteTask(id) {
    const setTodo = async () => {
      const res = await fetch(`${baseURL}/todos/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      await res.json();

      setTasks((tasks) => tasks.filter((task) => task._id !== id));
    };

    setTodo();
  }

  function addTask(newTask) {
    const todoData = {
      title: newTask,
    };
    const todoJSON = JSON.stringify(todoData);

    const setTodo = async () => {
      const response = await fetch(`${baseURL}/todos`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: todoJSON,
      });

      const jsonData = await response.json();

      setTasks((tasks) => [jsonData.todo, ...tasks]);
    };

    setTodo();
  }

  function clearTasks() {
    setTasks([]);
  }

  function toggleCompleted(id) {
    const completedStatus = tasks.find((task) => task._id === id).completed;

    const bodyData = {
      completed: !completedStatus,
    };
    const bodyJSON = JSON.stringify(bodyData);

    const setTodo = async () => {
      const response = await fetch(`${baseURL}/todos/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: bodyJSON,
      });

      await response.json();

      setTasks(function (tasks) {
        const updatedTasks = tasks.map((task) => {
          if (task._id === id) {
            return { ...task, completed: !task.completed };
          } else {
            return task;
          }
        });
        return [...updatedTasks];
      });
    };

    setTodo();
  }

  return (
    <TodoContext.Provider
      value={{
        tasks,
        deleteTask,
        addTask,
        clearTasks,
        toggleCompleted,
        getTasks,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
}

function useTodo() {
  return useContext(TodoContext);
}

export { TodoProvider, useTodo };
