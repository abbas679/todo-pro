import { useContext } from "react";
import { TodoContext } from "../context/TodoContext";

export const useTodos = () => {
  return useContext(TodoContext); // returns { todos, dispatch } with correct types
};
