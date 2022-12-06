import React, {FC, useState} from 'react';
import {useTodos} from '../../hooks/useTodos';
import {ITodos} from '../../types/types';
import './style.css';
import {storage} from '../../firebase';
import {ref, uploadBytesResumable, getDownloadURL} from 'firebase/storage';

interface NewTodoProps {
  todos: ITodos[] | [];
  setTodos: (todos: ITodos[] | []) => void;
}

export const NewTodo: FC<NewTodoProps> = ({todos, setTodos}) => {
  const {postTodo} = useTodos();
  const [todo, setTodo] = useState({title: '', text: '', id: '', url: ''});
  const [date, setDate] = useState('');
  const [fileUpload, setFileUpload] = useState<File | undefined>();
  const [valid, setValid] = useState(true);

  const uploadFile = (evt: React.MouseEvent<HTMLButtonElement>) => {
    evt.preventDefault();

    if (fileUpload && fileUpload.name) {
      const path = `files/${Date.now() + fileUpload.name}`;
      const storageRef = ref(storage, path);
      const upload = uploadBytesResumable(storageRef, fileUpload);

      upload.on('state_changed', () => {
        getDownloadURL(upload.snapshot.ref).then((downloadURL) => {
          setTodo({...todo, url: downloadURL});
        });
      });
    }
  };

  const addNewTodo = (evt: React.FormEvent<HTMLInputElement>) => {
    evt.preventDefault();

    if (todo.title === '') {
      setValid(false);
      setTimeout(() => {
        setValid(true);
      }, 3000);
      return;
    }

    setTodos([...todos, {...todo, date: Date.parse(date)}]);
    postTodo({...todo, date: Date.parse(date)});
    setTodo({title: '', text: '', id: '', url: ''});
    setDate('');
  };

  return (
    <div className='new-todo'>
      <form>
        <input
          value={todo.title}
          onChange={(evt) => setTodo({...todo, title: evt.target.value})}
          className='new-todo__input'
          type='text'
          placeholder='Назовите задачу'
          required
        />

        <textarea
          value={todo.text}
          onChange={(evt) => setTodo({...todo, text: evt.target.value})}
          className='new-todo__input'
          placeholder='Опишите задачу'
        />

        <input
          className='new-todo__date'
          type='date'
          onChange={(evt) => setDate(evt.target.value)}
        />

        <div className='new-todo__file-wrapper'>
          <input
            className='new-todo__file'
            type='file'
            onChange={(evt) => setFileUpload(evt.target?.files?.[0])}
          />
          <button
            type='button'
            className='btn new-todo__file-btn'
            onClick={uploadFile}
          >
            Добавить файл
          </button>
        </div>

        <input
          value='Добавить задачу'
          className='btn new-todo__submit'
          type='submit'
          onClick={addNewTodo}
        />

        {!valid ? (
          <p className='new-todo__invalid'>Введите название задачи</p>
        ) : (
          ''
        )}
      </form>
    </div>
  );
};
