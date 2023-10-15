import { createContext, useContext, useState } from "react";
import { useAuth } from "./AuthContext";

const TodoContext = createContext();

const dummyTasks = [
  {
    title: "Coding 1",
    _id: 1,
    completed: false,
    updatedAt: "2022-10-15T10:18:50.120Z",
    createdAt: "2022-10-15T10:18:50.120Z",
  },
  {
    title: "Coding 2",
    _id: 2,
    completed: false,
    createdAt: "2022-10-15T10:18:50.120Z",
    updatedAt: "2022-10-15T10:18:50.120Z",
  },
  {
    title: "Coding 3",
    _id: 3,
    completed: false,
    createdAt: "2022-10-15T10:18:50.120Z",
    updatedAt: "2022-10-15T10:18:50.120Z",
  },
];

const baseURL = "https://api-todo-9rux.onrender.com/api/v1";

function TodoProvider({ children }) {
  const [tasks, setTasks] = useState(dummyTasks);
  const { token } = useAuth();

  async function getTasks() {
    const response = await fetch(`${baseURL}/todos`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const jsonData = await response.json();

    setTasks([...jsonData.todos.reverse(), ...dummyTasks]);
    console.log(jsonData);
  }

  function deleteTask(id) {
    const setTodo = async () => {
      const res = await fetch(`${baseURL}/todos/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const jsonData = await res.json();

      console.log(jsonData.deletedTodo.title);
      console.log(jsonData.deletedTodo._id);
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

      console.log(jsonData);
      setTasks((tasks) => [jsonData.todo, ...tasks]);
    };

    setTodo();
  }

  function clearTasks() {
    setTasks([]);
  }

  function toggleCompleted(id) {
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
