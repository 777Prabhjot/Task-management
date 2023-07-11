'use client'
import { observer } from 'mobx-react-lite';
import { useState } from 'react';
import { useLocalStore } from 'mobx-react-lite';
import  TaskStore  from '../models/TaskStore';

const Home = observer(() => {
  const taskStore = useLocalStore(() => TaskStore.create());
  const [values, setValues] = useState({
    title: '',
    description: '',
    status: 'To Do'
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.currentTarget;

    setValues({
      ...values,
      [name]: value
    })
  }

  const handleAddTask = () => {
    if (values.title.trim() && values.description.trim()) {
      taskStore.addTask({ title: values.title.trim(), description: values.description.trim(), status: values.status.trim() })
    }
  };

  const handleUpdateTask = (taskId: string, newTitle: string, newDescription: string, newStatus: string) => {
    taskStore.updateTask({ id: taskId, title: newTitle, description: newDescription, status: newStatus });
  };

  const handleDeleteTask = (userId: string) => {
    taskStore.deleteTask(userId);
  };

  return (
    <div>
      <h1>Task Management App</h1>
      <div>
        <input type="text" name='title' placeholder="Title" onChange={handleChange} />
        <input type="text" name='description' placeholder="Description" onChange={handleChange} />
        <button onClick={handleAddTask}>Add Task</button>
      </div>
      <ul>
        {taskStore.tasks.map((task) => (
          <li key={task.id}>
            <input type="text" value={task.title} />
            <input type="email" value={task.description}/>
            <button onClick={() => handleDeleteTask(task.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
});

export default Home;
