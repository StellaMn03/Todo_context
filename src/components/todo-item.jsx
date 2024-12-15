import { useState, useContext } from "react";
import { ToDoContext } from "../todo-context";

export const ToDoItem = ({ todo }) => {
  const { onUpdate } = useContext(ToDoContext);
  const { todos, setTodos } = useContext(ToDoContext);

  const [subtaskText, setSubtaskText] = useState("");

  const handleAddSubtask = (todoId) => {
    if (subtaskText.trim()) {
      setTodos((prevTodos) =>
        prevTodos.map((todo) =>
          todo.id === todoId
            ? {
                ...todo,
                subtasks: [
                  ...(todo.subtasks || []),
                  { text: subtaskText, complited: false },
                ],
              }
            : todo
        )
      );
      setSubtaskText("");
    }
  };

  const handleSubtaskCompletion = (todoId, subtaskIndex) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === todoId
          ? {
              ...todo,
              subtasks: todo.subtasks.map((subtask, index) =>
                index === subtaskIndex
                  ? { ...subtask, complited: !subtask.complited }
                  : subtask
              ),
              complited: todo.subtasks.every((subtask, index) =>
                index === subtaskIndex ? !subtask.complited : subtask.complited
              ),
            }
          : todo
      )
    );
  };

  return (
    <div className="flex flex-col items-start p-4 bg-gray-600 dark:bg-gray-800 rounded-lg shadow-md hover:bg-gray-700 mb-5">
      <div className="flex items-center justify-between w-full">
        <p className="text-gray-300 text-lg font-medium">{todo.text}</p>
        <p className="text-gray-300 text-lg font-medium">{todo.description}</p>
        <p className="text-gray-400 text-sm italic">{todo.category}</p>
        <div className="flex space-x-2">
          <button
            onClick={() => onUpdate(todo.id)}
            className="px-3 py-1 text-sm font-semibold text-gray-800 bg-indigo-500 rounded-md shadow hover:bg-emerald-500"
          >
            {todo.complited ? "Cancel" : "Complete"}
          </button>

          <button className="px-3 py-1 text-sm font-semibold text-gray-800 bg-indigo-400 rounded-md shadow hover:bg-amber-500">
            Delete
          </button>
        </div>
      </div>

      <div className="flex mt-4 w-full space-x-2">
        <input
          type="text"
          value={subtaskText}
          onChange={(e) => setSubtaskText(e.target.value)}
          placeholder="Add a subtask"
          className="flex-grow px-3 py-1 text-sm text-gray-800 bg-gray-200 rounded-md focus:ring focus:ring-indigo-500 focus:outline-none"
        />
        <button
          onClick={() => handleAddSubtask(todo.id)}
          className="px-3 py-1 text-sm font-semibold text-gray-800 bg-indigo-400 rounded-md shadow hover:bg-pink-300"
        >
          Add
        </button>
      </div>

      <div className="flex flex-col space-y-2 mt-2">
        {todo.subtasks.map((subtask, index) => (
          <div key={index} className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={subtask.complited}
              onChange={() => handleSubtaskCompletion(todo.id, index)}
              className="text-emerald-400 focus:ring-emerald-400"
            />
            <p
              className={`text-gray-300 text-sm ${
                subtask.complited ? "line-through" : ""
              }`}
            >
              {subtask.text}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};
