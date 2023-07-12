import { types } from "mobx-state-tree";
import Task from "./Task";

const TaskStore = types
  .model({
    tasks: types.array(Task),
  })
  .actions((self) => ({
    addTask(task: {
      id: string;
      title: string;
      description: string;
      status: string;
    }) {
      self.tasks.push(
        Task.create({
          id: task.id,
          title: task.title,
          description: task.description,
          status: task.status,
        })
      );
    },
    updateTask(task: {
      id: string;
      title: string;
      description: string;
      status: string;
    }) {
      const existingTask = self.tasks.find((u) => u.id === task.id);

      if (existingTask) {
        existingTask.id = task.id;
        existingTask.title = task.title;
        existingTask.description = task.description;
        existingTask.status = task.status;
      }
    },
    deleteTask(taskId: string) {
      const taskIndex = self.tasks.findIndex((task) => task.id === taskId);
      if (taskIndex !== -1) {
        self.tasks.splice(taskIndex, 1);
      }
    },
    addExistingArray(existingArray: Array<any>) {
      self.tasks = self.tasks.concat(existingArray);
    },
  }));

export default TaskStore;
