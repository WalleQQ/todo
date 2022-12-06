import React, {FC} from 'react';
import {ITodos} from '../../types/types';
import {TodoItem} from '../todo-item/TodoItem';
import './style.css';

interface TodoListProps {
  todos: ITodos[];
  removeTodo: (id: string | undefined, todo: ITodos) => void;
}

export const TodoList: FC<TodoListProps> = ({todos, removeTodo}) => {
  return (
    <ul className='todo__list'>
      {todos.map((item) => (
        <TodoItem removeTodo={removeTodo} key={item.id} item={item} />
      ))}
    </ul>
  );
};
