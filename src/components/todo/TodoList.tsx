import { useState } from "react";
import { useTodos } from "../../context/TodoContext";
import { TodoItem } from "./TodoItem";
import { FilterBar } from "./FilterBar";
import { Button } from "../ui/Button";
import type { Todo } from "../../types/todo";

export const TodoList = () => {
  const { todos, dispatch } = useTodos();
  const [search, setSearch] = useState("");
  const [priority, setPriority] = useState<"all" | "low" | "medium" | "high">(
    "all",
  );

  const filtered: Todo[] = todos
    .filter(
      (t: Todo) =>
        t.title.toLowerCase().includes(search.toLowerCase()) ||
        t.description?.toLowerCase().includes(search.toLowerCase() || ""),
    )
    .filter((t: Todo) => (priority === "all" ? true : t.priority === priority))
    .sort(
      (a: Todo, b: Todo) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    );

  if (!todos.length)
    return (
      <p className="text-slate-400 text-center">No todos yet. Add one above!</p>
    );

  return (
    <>
      <FilterBar
        search={search}
        setSearch={setSearch}
        priority={priority}
        setPriority={setPriority}
      />
      {filtered.map((todo: Todo) => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
      <div className="flex justify-end mt-4">
        <Button
          variant="danger"
          onClick={() => dispatch({ type: "CLEAR_COMPLETED" })}
        >
          Clear Completed
        </Button>
      </div>
    </>
  );
};
