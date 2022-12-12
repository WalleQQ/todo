import React, {createContext, useEffect, useState} from 'react';
import {ITodos, TodosContextType} from '../types/types';
import {dbInstance} from '../utils/axios';

export const TodosContext = createContext<TodosContextType | null>(null);

interface TodosProviderProps {
  children?: React.ReactNode;
}

const TodosProvider: React.FC<TodosProviderProps> = ({children}) => {
  const [todos, setTodos] = useState<ITodos[]>([]);
  const randomId = `user${Date.now()}`;

  if (!localStorage.getItem('user')) {
    localStorage.setItem('user', randomId);
  }

  const userId = localStorage.getItem('user');

  const fetchTodos = async () => {
    let result = [];
    try {
      const response = await dbInstance.get<ITodos>(`${userId}.json`);

      for (const [key, value] of Object.entries(response.data)) {
        const obj = Object.assign({...value, id: key});
        result.push(obj);
      }

      setTodos(result);
    } catch (e) {
    } finally {
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const createTodo = async (todo: ITodos) => {
    const newTodo: ITodos = {
      id: todo.id,
      title: todo.title,
      text: todo.text,
      date: todo.date,
      url: todo.url,
    };
    const response = await dbInstance.post(`${userId}.json`, newTodo);
    // postTodo(newTodo);
    setTodos([...todos, {...newTodo, id: response.data.name}]);
  };

  const updateTodo = async (id: string, todo: ITodos) => {
    await dbInstance.patch(`${userId}/${id}.json`, todo);
    todos.filter((todo: ITodos) => {
      if (todo.id === id) {
        setTodos([...todos]);
      }
    });
  };

  const deleteTodo = async (id: string, todo: ITodos) => {
    await dbInstance.delete(`${userId}/${id}.json`);
    setTodos(todos.filter((p) => p.id !== todo.id));
  };
  return (
    <TodosContext.Provider value={{todos, createTodo, updateTodo, deleteTodo}}>
      {children}
    </TodosContext.Provider>
  );
};

export default TodosProvider;
