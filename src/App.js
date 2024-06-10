import "./App.css";
import TodoForm from "./components/TodoForm";
import TodoItem from "./components/TodoItem";
import { TodoProvider } from "./contexts/todoContext";
import { useEffect, useState } from "react";

function App() {
  // code for make set and update todo

  const [todos, setTodos] = useState([]);

  const addTodo = (todo) => {
    setTodos((oldtodo) => [todo, ...oldtodo]);
  };

  // or you can write this
  const updateTodo = (id, todo) => {
    setTodos((oldtodo) => oldtodo.map((prevtodo) => (prevtodo.id === id ? todo : prevtodo)));
  };

  const deleteTodo = (id) => {
    setTodos((oldtodo) => oldtodo.filter((todo) => todo.id !== id));
  };

  const doneTodo = (id) => {
    setTodos((oldtodo) => oldtodo.map((eachTodo) => (eachTodo.id === id ? { ...eachTodo, done: !eachTodo.done } : eachTodo)));
  };

  // code for local storage use in browser

  useEffect(() => {
    const todos = JSON.parse(localStorage.getItem("todos"));

    if (todos && todos.length > 0) {
      setTodos(todos);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  return (
    <TodoProvider value={{ todos, addTodo, updateTodo, doneTodo, deleteTodo }}>
      <div className="bg-[#172842] min-h-screen py-8">
        <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
          <h1 className="text-2xl font-bold text-center mb-8 mt-2">Manage Your Todos</h1>
          <div className="mb-4">
            {/* Todo form goes here */}
            <TodoForm />
          </div>
          <div className="flex flex-wrap gap-y-3">
            {/*Loop and Add TodoItem here */}
            {todos.map((todo) => (
              <div key={todo.id} className="w-full">
                <TodoItem todo={todo} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </TodoProvider>
  );
}

export default App;
