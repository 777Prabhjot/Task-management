'use client'
import { Provider } from 'mobx-react';
import  TaskStore  from './TaskStore';


const taskStore = TaskStore.create();

export const TaskProvider = ({children}: {children: React.ReactNode}) => {
    return <Provider taskStore={taskStore}>{children}</Provider>
}
