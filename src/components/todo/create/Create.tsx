import React, {useContext, useState} from 'react';
import './style.css';
import {ref, uploadBytesResumable, getDownloadURL} from 'firebase/storage';

import {storage} from '../../../firebase';
import {TodosContextType} from '../../../types/types';
import {TodosContext} from '../../../context/todos-context';

export const CreateTodo = () => {
  const [todo, setTodo] = useState({title: '', text: '', id: '', url: ''});
  const [date, setDate] = useState('');
  const [fileUpload, setFileUpload] = useState<File | undefined>();
  const [valid, setValid] = useState(true);
  const {createTodo} = useContext(TodosContext) as TodosContextType;

  const uploadFile = (evt: React.MouseEvent<HTMLButtonElement>) => {
    evt.preventDefault();

    if (fileUpload && fileUpload.name) {
      const path = `files/${Date.now() + fileUpload.name}`;
      const storageRef = ref(storage, path);
      const upload = uploadBytesResumable(storageRef, fileUpload);

      upload.on('state_changed', () => {
        getDownloadURL(upload.snapshot.ref).then((downloadURL) => {
          alert('File available at' + downloadURL);
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

    createTodo({...todo, date: Date.parse(date)});
    setTodo({title: '', text: '', id: '', url: ''});
    setDate('');
  };

  return (
    <div className='create-todo'>
      <form>
        <input
          value={todo.title}
          onChange={(evt) => setTodo({...todo, title: evt.target.value})}
          className='create-todo__input'
          type='text'
          placeholder='Назовите задачу'
          required
        />

        <textarea
          value={todo.text}
          onChange={(evt) => setTodo({...todo, text: evt.target.value})}
          className='create-todo__input'
          placeholder='Опишите задачу'
        />

        <input
          className='create-todo__date'
          type='date'
          onChange={(evt) => setDate(evt.target.value)}
        />

        <div className='create-todo__file-wrapper'>
          <input
            className='create-todo__file'
            type='file'
            onChange={(evt) => setFileUpload(evt.target?.files?.[0])}
          />
          <button
            type='button'
            className='btn create-todo__file-btn'
            onClick={uploadFile}
          >
            Добавить файл
          </button>
        </div>

        <input
          value='Добавить задачу'
          className='btn create-todo__submit'
          type='submit'
          onClick={addNewTodo}
        />

        {!valid ? (
          <p className='create-todo__invalid'>Введите название задачи</p>
        ) : (
          ''
        )}
      </form>
    </div>
  );
};
