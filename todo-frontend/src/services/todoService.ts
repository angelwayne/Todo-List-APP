import axios from 'axios';
import { Todo } from '../types/Todo';

const API_URL = 'http://localhost:5274/api/TodoItems';

export const getTodos = ()=> axios.get<Todo[]>(API_URL); 
export const getTodo = (id: number) => axios.get<Todo>(`${API_URL}/${id}`);
export const createTodo = (todo: Omit<Todo, 'id'>) => axios.post<Todo>(API_URL, todo);
export const updateTodo = (todo: Todo) => axios.put(`${API_URL}/${todo.id}`, todo);
export const deleteTodo =(id: number) => axios.delete(`${API_URL}/${id}`);
