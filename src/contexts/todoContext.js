import { createContext, useContext } from "react";

export const TodoContext = createContext({
  todos: [
    {
      id: 1,
      todo: "try 1",
      done: false,
    },
  ],
  addTodo: (todo) => {},
  updateTodo: (id, todo) => {},
  doneTodo: (id) => {},
  deleteTodo: (id) => {},
});

export const useTodo = () => {
  return useContext(TodoContext);
};

export const TodoProvider = TodoContext.Provider;
