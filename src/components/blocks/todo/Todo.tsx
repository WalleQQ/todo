import React from 'react';
import {useTodos} from '../../../hooks/useTodos';
import {NewTodo} from '../../new-todo/NewTodo';
import {TodoList} from '../../todo-list/TodoList';
import './style.css';

export const Todo = () => {
  const {todos, setTodos, removeTodo} = useTodos();

  return (
    <section className='todo'>
      <NewTodo todos={todos} setTodos={setTodos} />
      <TodoList removeTodo={removeTodo} todos={todos} />
    </section>
  );
};
