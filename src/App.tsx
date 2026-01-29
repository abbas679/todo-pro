import { TodoProvider } from "./context/TodoContext";
import { Header } from "./components/layout/Header";
import { TodoForm } from "./components/todo/TodoForm";
import { TodoList } from "./components/todo/TodoList";

const App = () => (
  <TodoProvider>
    <div className="min-h-screen flex items-start justify-center px-4 py-8 bg-slate-950">
      <div className="w-full max-w-2xl">
        <Header />
        <TodoForm />
        <TodoList />
      </div>
    </div>
  </TodoProvider>
);

export default App;
