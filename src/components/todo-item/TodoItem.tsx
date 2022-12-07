import React, {FC, useState} from 'react';
import {useTodos} from '../../hooks/useTodos';
import {ITodos} from '../../types/types';
import './style.css';

interface TodoItemProps {
  item: ITodos;
  removeTodo: (id: string | undefined, todo: ITodos) => void;
}

export const TodoItem: FC<TodoItemProps> = ({item, removeTodo}) => {
  const {patchTodo} = useTodos();
  const [todo, setTodo] = useState({
    title: item.title,
    text: item.text,
    date: item?.date || '',
  });

  const editTodo = (id: string | undefined, todo: object) => {
    patchTodo(id, todo);
  };

  function padTo2Digits(num: number) {
    return num.toString().padStart(2, '0');
  }

  function formatDate() {
    const date = new Date(todo.date);
    return [
      date.getFullYear(),
      padTo2Digits(date.getMonth() + 1),
      padTo2Digits(date.getDate()),
    ].join('-');
  }

  return (
    <li className='todo__item'>
      <form className='todo__item-form'>
        <input
          className='todo__item-title'
          type='text'
          value={todo.title}
          placeholder='Название'
          onChange={(evt) => setTodo({...todo, title: evt.target.value})}
          onBlur={() => editTodo(item.id, todo)}
        />

        <textarea
          className='todo__item-text'
          value={todo.text}
          placeholder='Описание'
          onChange={(evt) => setTodo({...todo, text: evt.target.value})}
          onBlur={() => editTodo(item.id, todo)}
        />

        <input
          type='date'
          defaultValue={formatDate()}
          onChange={(evt) => setTodo({...todo, date: evt.target.value})}
          onBlur={(evt) =>
            editTodo(item.id, {...todo, date: Date.parse(evt.target.value)})
          }
        />

        {item.url !== '' ? (
          <a className='todo__item-file' target='_blank' href={item.url}>
            Посмотреть файл
          </a>
        ) : (
          ''
        )}

        {Date.now() > todo.date ? (
          <p className='todo__item-error'>Задача просрочена</p>
        ) : (
          ''
        )}

        <button
          onClick={() => removeTodo(item.id, item)}
          className='btn todo__item-remove'
          type='button'
        >
          Удалить
        </button>
        <button
          onClick={() => removeTodo(item.id, item)}
          className='btn todo__item-completed'
          type='button'
        >
          Завершить
        </button>
      </form>
    </li>
  );
};
