import { types } from 'mobx-state-tree';

const Task = types.model({
  id: types.identifier,
  title: types.string,
  description: types.string,
  status: types.string,
});

export default Task;