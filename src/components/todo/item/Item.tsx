import React, {FC, useContext, useState} from 'react';
import {TodosContext} from '../../../context/todos-context';
import {ITodos, TodosContextType} from '../../../types/types';
import {formatDate} from '../../../utils/helpers';

import './style.css';

interface TodoItemProps {
  item: ITodos;
}

export const TodoItem: FC<TodoItemProps> = ({item}) => {
  const {deleteTodo, updateTodo} = useContext(TodosContext) as TodosContextType;
  const [todo, setTodo] = useState({
    id: item.id,
    title: item.title,
    text: item.text,
    date: item?.date,
  });

  return (
    <li className='todo-item'>
      <form className='todo-item__form'>
        <input
          className='todo-item__title'
          type='text'
          value={todo.title}
          placeholder='Название'
          onChange={(evt) => setTodo({...todo, title: evt.target.value})}
          onBlur={() => updateTodo(todo.id, todo)}
        />

        <textarea
          className='todo-item__text'
          value={todo.text}
          placeholder='Описание'
          onChange={(evt) => setTodo({...todo, text: evt.target.value})}
          onBlur={() => updateTodo(todo.id, todo)}
        />

        <input
          className='todo-item__date'
          type='date'
          defaultValue={formatDate(todo.date as number)}
          onChange={(evt) =>
            setTodo({...todo, date: Date.parse(evt.target.value)})
          }
          onBlur={(evt) => updateTodo(todo.id, todo)}
        />

        {item.url !== '' ? (
          <a
            className='todo-item__file'
            target='_blank'
            rel='noreferrer'
            href={item.url}
          >
            Посмотреть файл
          </a>
        ) : (
          ''
        )}

        {todo.date && Date.now() > todo.date ? (
          <p className='todo-item__error'>Задача просрочена</p>
        ) : (
          ''
        )}

        <button
          onClick={() => deleteTodo(item.id, item)}
          className='btn todo-item__remove'
          type='button'
        >
          Удалить
        </button>
        <button
          onClick={() => deleteTodo(item.id, item)}
          className='btn todo-item__completed'
          type='button'
        >
          Завершить
        </button>
      </form>
    </li>
  );
};
