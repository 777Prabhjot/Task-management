'use client'
import { Provider } from 'mobx-react';
import  TaskStore  from './TaskStore';

// const tasks = JSON.parse(localStorage.getItem('tasks'));
const existingTasks = [
    { id: '1', title: 'Task 1', description: 'Description 1', status: 'Pending' },
    { id: '2', title: 'Task 2', description: 'Description 2', status: 'Completed' },
    // Add more task objects as needed
  ];

const taskStore = TaskStore.create({tasks: existingTasks});

export const TaskProvider = ({children}: {children: React.ReactNode}) => {
    return <Provider taskStore={taskStore}>{children}</Provider>
}
