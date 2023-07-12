"use client";
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { useLocalObservable } from "mobx-react-lite";
import TaskStore from "../models/TaskStore";
import TasksTable from "@/components/TasksTable";

const Home = observer(() => {
  const taskStore = useLocalObservable(() => TaskStore.create());
  let existedTasks: Array<any> =
    typeof window !== "undefined" &&
    JSON.parse(window.localStorage.getItem("tasks") || "{}");
  const [tasks, setTasks] = useState<Array<any>>([]);
  const [values, setValues] = useState({
    id: Math.random().toString(),
    title: "",
    description: "",
  });
  const [status, setStatus] = useState("To Do");
  const [update, setUpdate] = useState({
    taskId: "",
    update: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;

    setValues({
      ...values,
      [name]: value,
    });
  };

  useEffect(() => {
    if (existedTasks) {
      setTasks(existedTasks);
      taskStore.addExistingArray(existedTasks);
    }
  }, []);

  const handleAddTask = () => {
    if (values.title.trim() && values.description.trim()) {
      taskStore.addTask({
        id: values.id,
        title: values.title.trim(),
        description: values.description.trim(),
        status: status.trim(),
      });

      if (existedTasks) {
        existedTasks.push({
          id: values.id,
          title: values.title,
          description: values.description,
          status,
        });
        localStorage.setItem("tasks", JSON.stringify(existedTasks));
        setTasks(existedTasks);
      } else {
        const tasksArr: Array<object> = [];
        tasksArr.push({
          id: values.id,
          title: values.title,
          description: values.description,
          status,
        });
        localStorage.setItem("tasks", JSON.stringify(tasksArr));
        setTasks(tasksArr);
      }
    }

    setValues({ id: Math.random().toString(), title: "", description: "" });
  };

  const handleUpdateTask = () => {
    taskStore.updateTask({
      id: update.taskId,
      title: values.title,
      description: values.description,
      status,
    });

    existedTasks.forEach((item) => {
      if (item.id === update.taskId) {
        (item.title = values.title), (item.description = values.description);
        item.status = status;
      }
    });

    localStorage.setItem("tasks", JSON.stringify(existedTasks));
    setTasks(existedTasks);

    setValues({ id: Math.random().toString(), title: "", description: "" });
    setUpdate({ taskId: "", update: false });
    setStatus("To Do");
  };

  const handleDeleteTask = (taskId: string) => {
    taskStore.deleteTask(taskId);

    const newTasks = existedTasks.filter((item) => item.id !== taskId);
    existedTasks = newTasks;
    localStorage.setItem("tasks", JSON.stringify(existedTasks));
    setTasks(existedTasks);
  };

  return (
    <div className="w-full flex flex-col justify-center items-center p-4">
      <h1 className="text-3xl font-bold my-8">Task Management App</h1>
      <div className="flex flex-col">
        <input
          className="mt-4 p-2 border-[2px]"
          type="text"
          name="title"
          value={values.title}
          placeholder="Title"
          onChange={handleChange}
        />
        <input
          className="mt-4 p-2 border-[2px]"
          type="text"
          name="description"
          value={values.description}
          placeholder="Description"
          onChange={handleChange}
        />
        {update.update ? (
          <>
            <select
              className="mt-4 p-2 border-[2px]"
              defaultValue={status}
              value={status}
              name="status"
              onChange={(e) => setStatus(e.target.value)}
            >
              <option>To Do</option>
              <option>In Progress</option>
              <option>Completed</option>
            </select>
            <button
              className="mt-4 bg-blue-500 p-2 text-white"
              onClick={handleUpdateTask}
            >
              Update Task
            </button>
          </>
        ) : (
          <button
            className="mt-4 bg-blue-500 p-2 text-white"
            onClick={handleAddTask}
          >
            Add Task
          </button>
        )}
      </div>
      <TasksTable>
        {tasks.map(
          (task: {
            id: string;
            title: string;
            description: string;
            status: string;
          }) => (
            <tr key={task.id}>
              <td className="w-1/3 text-left py-3 px-4">{task.title}</td>
              <td className="w-1/3 text-left py-3 px-4">{task.description}</td>
              <td className="text-left py-3 px-4">
                <button
                  className="hover:text-blue-500"
                  onClick={() => {
                    setValues({
                      id: task.id,
                      title: task.title,
                      description: task.description,
                    });
                    setStatus(task.status);
                    setUpdate({ taskId: task.id, update: true });
                  }}
                >
                  {task.status}
                </button>
              </td>
              <td className="text-left py-3 px-4">
                <button
                  className="bg-blue-500 p-1 text-white"
                  onClick={() => handleDeleteTask(task.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          )
        )}
      </TasksTable>
    </div>
  );
});

export default Home;
