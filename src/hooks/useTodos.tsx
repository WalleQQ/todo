import {useEffect, useState} from 'react';
import {ITodos} from '../types/types';
import {dbInstance} from '../utils/axios';

export const useTodos = () => {
  const [todos, setTodos] = useState<ITodos[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const fetchTodos = async () => {
    let result = [];
    try {
      setLoading(true);

      const response = await dbInstance.get<ITodos>('.json');

      for (const [key, value] of Object.entries(response.data)) {
        const obj = Object.assign({...value, id: key});
        result.push(obj);
      }

      setTodos(result);
    } catch (e) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const postTodo = async (todo: object) => {
    try {
      setLoading(true);
      await dbInstance.post('.json', todo);
    } catch (e) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const patchTodo = async (id: string | undefined, todo: object) =>
    await dbInstance.patch(`${id}.json`, todo);

  const removeTodo = async (id: string | undefined, todo: ITodos) => {
    await dbInstance.delete(`${id}.json`);
    setTodos(todos.filter((p) => p.id !== todo.id));
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return {
    todos,
    setTodos,
    fetchTodos,
    removeTodo,
    postTodo,
    patchTodo,
    loading,
    error,
  };
};
