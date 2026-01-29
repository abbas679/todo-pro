import type { Todo } from "../types/todo";

const TODOS_KEY = "todos";

export const storageService = {
  getTodos: (): Todo[] => {
    const stored = localStorage.getItem(TODOS_KEY);
    return stored ? JSON.parse(stored) : [];
  },

  saveTodos: (todos: Todo[]) => {
    localStorage.setItem(TODOS_KEY, JSON.stringify(todos));
  },
};
