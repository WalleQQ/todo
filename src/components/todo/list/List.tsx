import React, {useContext} from 'react';
import {TodosContext} from '../../../context/todos-context';
import {TodosContextType} from '../../../types/types';
import {TodoItem} from '../item/Item';
import './style.css';

export const TodoList = () => {
  const {todos} = useContext(TodosContext) as TodosContextType;

  return (
    <>
      <ul className='todo-list'>
        {todos.map((item) => (
          <TodoItem key={item.id} item={item} />
        ))}
      </ul>
    </>
  );
};
