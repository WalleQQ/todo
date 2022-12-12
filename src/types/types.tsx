export interface ITodos {
  id: string;
  title: string;
  text?: string;
  date?: number;
  url?: string;
}

export type TodosContextType = {
  todos: ITodos[];
  createTodo: (todo: ITodos) => void;
  updateTodo: (id: string, todo: ITodos) => void;
  deleteTodo: (id: string, todo: ITodos) => void;
};
