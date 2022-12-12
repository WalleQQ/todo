import React, {createContext} from 'react';
import TodosProvider from '../../context/todos-context';
import {TodosContextType} from '../../types/types';
import {CreateTodo} from './create/Create';
import {TodoList} from './list/List';
import './style.css';

export const TodosContext = createContext<TodosContextType | null>(null);

export const Todo = () => {
  return (
    <TodosProvider>
      <section className='todo'>
        <CreateTodo />
        <TodoList />
      </section>
    </TodosProvider>
  );
};
