import { useState } from "react";
import { ToDoList } from "./components/todo-list";
import { ToDoContext } from "./todo-context";
import { ThemeSwitcher } from "./components/ThemeSwitcher";

export default function App() {
  const [todos, setTodos] = useState([
    {
      id: 101,
      text: "css task",
      description: "do something",
      complited: false,
      category: "normal",
      subtasks: [],
    },
    {
      id: 102,
      text: "js task",
      description: "do something",
      complited: false,
      category: "urgent",
      subtasks: [],
    },
    {
      id: 103,
      text: "react task",
      description: "do something",
      complited: false,
      category: "low",
      subtasks: [],
    },
    {
      id: 104,
      text: "node task",
      description: "do something",
      complited: false,
      category: "normal",
      subtasks: [],
    },
  ]);

  const [currentFilter, setCurrentFilter] = useState("all");
  const [filters, setFilters] = useState([
    "all",
    "active",
    "complited",
    "urgent",
    "normal",
    "low",
  ]);

  const handleUpdate = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, complited: !todo.complited } : todo
      )
    );
  };

  const handleAdd = (todo) => {
    setTodos([
      ...todos,
      {
        ...todo,
        complited: false,
        id: Date.now(),
        category: todo.category || "normal",
        subtasks: todo.subtasks || [],
      },
    ]);
  };
  const handleAddSubtask = (todoId) => {
    const subtaskText = prompt("Enter subtask:");
    if (subtaskText) {
      setTodos(
        todos.map((todo) =>
          todo.id === todoId
            ? {
                ...todo,
                subtasks: [
                  ...todo.subtasks,
                  { text: subtaskText, complited: false },
                ],
              }
            : todo
        )
      );
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 bg-gray-300 dark:bg-gray-900 text-gray-800 dark:text-gray-200">
      <ThemeSwitcher />

      <ToDoContext.Provider
        value={{
          todos,
          onUpdate: handleUpdate,
          filters,
          currentFilter,
          setTodos,
          onFilter: setCurrentFilter,
          onAdd: handleAdd,
          onSub: handleAddSubtask,
        }}
      >
        <ToDoList />
      </ToDoContext.Provider>
    </div>
  );
}
