'use client'
import { Provider } from 'mobx-react';
import  UserStore  from './TaskStore';

const userStore = UserStore.create();

// const taskStore = TaskStore.create();

export const TaskProvider = ({children}: {children: React.ReactNode}) => {
    return <Provider userStore={userStore}>{children}</Provider>
}
