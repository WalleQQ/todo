import axios from 'axios';
import {useEffect, useState} from 'react';
import {ITodos} from '../types/types';
import {dbInstance} from '../utils/axios';

export const useTodos = () => {
  const [todos, setTodos] = useState<ITodos[]>([]);

  const fetchTodos = async () => {
    let result = [];
    try {
      const response = await dbInstance.get<ITodos>('.json');

      for (const [key, value] of Object.entries(response.data)) {
        const obj = Object.assign({...value, id: key});
        result.push(obj);
      }

      setTodos(result);
    } catch (e) {
    } finally {
    }
  };

  const postTodo = async (todo: object) => {
    try {
      await dbInstance.post('.json', todo);
    } catch (e) {
    } finally {
    }
  };

  const patchTodo = async (id: string | undefined, todo: object) => {
    try {
      await dbInstance.patch(`${id}.json`, todo);
    } catch (e) {
    } finally {
    }
  };

  const removeTodo = (id: string | undefined, todo: ITodos) => {
    dbInstance.delete(`${id}.json`);
    setTodos(todos.filter((p) => p.id !== todo.id));
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return {todos, setTodos, fetchTodos, removeTodo, postTodo, patchTodo};
};
