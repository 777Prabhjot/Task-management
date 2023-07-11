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
  }));

export default TaskStore;
