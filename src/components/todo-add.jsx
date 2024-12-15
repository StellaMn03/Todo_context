import { useContext } from "react";
import { useForm } from "react-hook-form";
import { ToDoContext } from "../todo-context";

export const ToDoAdd = () => {
  const { onAdd } = useContext(ToDoContext);
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
    <div className="max-w-md mx-auto p-6 bg-gray-400 dark:bg-gray-900 rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold text-gray-700 dark:text-gray-200  mb-4">
        Add To Do
      </h1>
      <form
        onSubmit={handleSubmit((data) => {
          onAdd(data);
          reset();
        })}
        className="space-y-4"
      >
        <p id="message" className="text-sm text-amber-400"></p>

        <div className="flex flex-col">
          <label className="text-fray-400  mb-1">Text</label>
          {errors.text && (
            <p className="text-red-500 p-2 my-2">{errors.text.message}</p>
          )}
          <input
            {...register("text", { required: "Please fill in the text" })}
            type="text"
            className="p-2 bg-gray-600 dark:bg-gray-800 text-gray-300 rounded-lg focus:ring-emerald-400 focus:outline-none"
          />
        </div>

        <div className="flex flex-col">
          <label className="text-fray-400 mb-1">Description</label>
          <input
            {...register("description")}
            type="text"
            className="p-2 bg-gray-600 dark:bg-gray-800 text-gray-300 rounded-lg focus:border-emerald-400 focus:outline-none"
          />
        </div>

        <div className="flex flex-col">
          <label className="text-fray-400 mb-1">Category</label>
          <select
            {...register("category", { required: "Please select a category" })}
            className="p-2 bg-gray-600 dark:bg-gray-800 text-gray-300 rounded-lg focus:ring-emerald-400 focus:outline-none"
          >
            <option value="urgent">Urgent</option>
            <option value="normal">Normal</option>
            <option value="low">Low</option>
          </select>
          {errors.category && (
            <p className="text-red-500 p-2 my-2">{errors.category.message}</p>
          )}
        </div>

        <button className="w-full px-4 py-2 text-lg font-semibold text-white bg-indigo-800 rounded-lg hover:bg-indigo-500">
          Save
        </button>
      </form>
    </div>
  );
};
