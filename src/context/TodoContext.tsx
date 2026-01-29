import type { ReactNode, Dispatch } from "react";
import { createContext, useReducer, useContext } from "react";
import { storageService } from "../services/storageService";
import type { Todo } from "../types/todo";

export type TodoAction =
  | { type: "ADD_TODO"; payload: Omit<Todo, "id" | "completed" | "createdAt"> }
  | { type: "DELETE_TODO"; payload: { id: string } }
  | { type: "TOGGLE_TODO"; payload: { id: string } }
  | { type: "CLEAR_COMPLETED" }
  | {
      type: "EDIT_TODO";
      payload: {
        id: string;
        title: string;
        description?: string;
        priority: "low" | "medium" | "high";
        dueDate?: string;
      };
    };

interface TodoState {
  todos: Todo[];
}

const initialState: TodoState = {
  todos: storageService.getTodos(),
};

export const TodoContext = createContext<{
  todos: Todo[];
  dispatch: Dispatch<TodoAction>;
}>({
  todos: [],
  dispatch: () => null,
});

const todoReducer = (state: TodoState, action: TodoAction): TodoState => {
  switch (action.type) {
    case "ADD_TODO": {
      const newTodo: Todo = {
        id: crypto.randomUUID(),
        title: action.payload.title,
        description: action.payload.description,
        priority: action.payload.priority,
        dueDate: action.payload.dueDate,
        completed: false,
        createdAt: new Date().toISOString(),
      };
      const updatedAdd = [...state.todos, newTodo];
      storageService.saveTodos(updatedAdd);
      return { todos: updatedAdd };
    }

    case "DELETE_TODO": {
      const updatedDelete = state.todos.filter(
        (t) => t.id !== action.payload.id,
      );
      storageService.saveTodos(updatedDelete);
      return { todos: updatedDelete };
    }

    case "TOGGLE_TODO": {
      const updatedToggle = state.todos.map((t) =>
        t.id === action.payload.id ? { ...t, completed: !t.completed } : t,
      );
      storageService.saveTodos(updatedToggle);
      return { todos: updatedToggle };
    }

    case "EDIT_TODO": {
      const updatedEdit = state.todos.map((t) =>
        t.id === action.payload.id ? { ...t, ...action.payload } : t,
      );
      storageService.saveTodos(updatedEdit);
      return { todos: updatedEdit };
    }

    case "CLEAR_COMPLETED": {
      const updatedClear = state.todos.filter((t) => !t.completed);
      storageService.saveTodos(updatedClear);
      return { todos: updatedClear };
    }

    default:
      return state;
  }
};

export const TodoProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(todoReducer, initialState);
  return (
    <TodoContext.Provider value={{ todos: state.todos, dispatch }}>
      {children}
    </TodoContext.Provider>
  );
};

export const useTodos = () => useContext(TodoContext);
