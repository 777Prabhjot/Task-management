'use client'
import { createContext, useContext } from 'react';
import { types, Instance } from 'mobx-state-tree';
import TaskStore from './TaskStore';

const RootModel = types.model({
  taskStore: TaskStore,
});

const initialState = {
    taskStore: {
    tasks: [],
  },
};

export const rootStore = RootModel.create(initialState);
const RootStoreContext = createContext<null | Instance<typeof RootModel>>(null);

export const RootProvider = ({ children }: {children: React.ReactNode}) => (
  <RootStoreContext.Provider value={rootStore}>{children}</RootStoreContext.Provider>
);

export const useMst = () => useContext(RootStoreContext);

