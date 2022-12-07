import React, {FC} from 'react';
import {useTodos} from '../../hooks/useTodos';
import {ITodos} from '../../types/types';
import {TodoItem} from '../todo-item/TodoItem';
import './style.css';

interface TodoListProps {
  todos: ITodos[];
  removeTodo: (id: string | undefined, todo: ITodos) => void;
}

export const TodoList: FC<TodoListProps> = ({todos, removeTodo}) => {
  const {loading, error} = useTodos();

  if (error) {
    return <p className='error'>Ошибка загрузки</p>;
  }
  return (
    <>
      {!loading ? (
        <ul className='todo__list'>
          {todos.map((item) => (
            <TodoItem removeTodo={removeTodo} key={item.id} item={item} />
          ))}
        </ul>
      ) : (
        <p className='erorr'>Загружается список дел</p>
      )}
    </>
  );
};
