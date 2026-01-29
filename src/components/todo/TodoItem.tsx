import { useState } from "react";
import type { Todo } from "../../types/todo";
import { useTodos } from "../../context/TodoContext";
import { Button } from "../ui/Button";

interface TodoItemProps {
  todo: Todo;
}

export const TodoItem = ({ todo }: TodoItemProps) => {
  const { dispatch } = useTodos();
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(todo.title);
  const [description, setDescription] = useState(todo.description || "");
  const [priority, setPriority] = useState(todo.priority);
  const [dueDate, setDueDate] = useState(todo.dueDate || "");

  const isOverdue =
    todo.dueDate && new Date(todo.dueDate) < new Date() && !todo.completed;

  const handleSave = () => {
    if (!title.trim()) return;
    dispatch({
      type: "EDIT_TODO",
      payload: { id: todo.id, title, description, priority, dueDate },
    });
    setIsEditing(false);
  };

  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 bg-slate-800 rounded-xl mb-2 shadow hover:scale-[1.01] transition-transform duration-200">
      {isEditing ? (
        <div className="flex flex-col gap-2 w-full">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="p-2 rounded-lg bg-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-primary w-full"
          />
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="p-2 rounded-lg bg-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-primary w-full resize-none"
          />
          <div className="flex gap-2 flex-wrap">
            <select
              value={priority}
              onChange={(e) =>
                setPriority(e.target.value as "low" | "medium" | "high")
              }
              className="p-2 rounded-lg bg-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
            <input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="p-2 rounded-lg bg-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <div className="flex gap-2 mt-2">
            <Button variant="primary" onClick={handleSave}>
              Save
            </Button>
            <Button variant="secondary" onClick={() => setIsEditing(false)}>
              Cancel
            </Button>
          </div>
        </div>
      ) : (
        <div className="flex justify-between items-center w-full">
          <div>
            <h3
              className={`font-semibold text-lg ${todo.completed ? "line-through text-slate-400" : "text-white"}`}
            >
              {todo.title}
            </h3>
            {todo.description && (
              <p className="text-slate-400 text-sm">{todo.description}</p>
            )}
            <div className="flex flex-wrap gap-2 mt-1">
              <span
                className={`text-xs px-2 py-1 rounded-full ${todo.priority === "high" ? "bg-red-500 text-black" : todo.priority === "medium" ? "bg-yellow-500 text-black" : "bg-green-500 text-black"}`}
              >
                {todo.priority}
              </span>
              {todo.dueDate && (
                <span
                  className={`text-xs px-2 py-1 rounded-full ${isOverdue ? "bg-red-700 text-white" : "bg-slate-500 text-black"}`}
                >
                  Due: {new Date(todo.dueDate).toLocaleDateString()}
                </span>
              )}
            </div>
          </div>
          <div className="flex gap-2">
            <Button
              variant="secondary"
              onClick={() =>
                dispatch({ type: "TOGGLE_TODO", payload: { id: todo.id } })
              }
            >
              {todo.completed ? "Undo" : "Done"}
            </Button>
            <Button variant="primary" onClick={() => setIsEditing(true)}>
              Edit
            </Button>
            <Button
              variant="danger"
              onClick={() =>
                dispatch({ type: "DELETE_TODO", payload: { id: todo.id } })
              }
            >
              Delete
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};
