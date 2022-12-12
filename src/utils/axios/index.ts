import axios from 'axios';

export const dbInstance = axios.create({
  baseURL: 'https://todo-bdb8e-default-rtdb.europe-west1.firebasedatabase.app/',
});
