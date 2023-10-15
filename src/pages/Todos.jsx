import { useEffect } from "react";
import Form from "../components/Form/Form";
import Header from "../components/Header/Header";
import TodoList from "../components/TodoList/TodoList";
import { useTodo } from "../contexts/TodoContext";

function Todos() {
  const { getTasks } = useTodo();

  useEffect(function () {
    getTasks();
  }, []);

  return (
    <main>
      <Header />
      <Form />
      <TodoList />
    </main>
  );
}

export default Todos;
