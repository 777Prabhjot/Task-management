import { types } from 'mobx-state-tree';
import Task from './Task';

const TaskStore = types
  .model({
    tasks: types.array(Task),
  })
  .actions((self) => ({
    addTask(task: { title: string; description: string, status: string }) {
      self.tasks.push(Task.create({ id: Math.random().toString(), ...task }));
    },
    updateTask(task: { id: string; title: string; description: string, status: string }) {
      const existingTask = self.tasks.find((u) => u.id === task.id);
      if (existingTask) {
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
  }));

export default TaskStore;
