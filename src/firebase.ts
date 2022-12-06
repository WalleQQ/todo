import {initializeApp} from 'firebase/app';
import {getStorage} from 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyBwd8V0GH_9OYT2dxHwxfxqVUu2QF_BfBI',
  authDomain: 'todo-bdb8e.firebaseapp.com',
  databaseURL:
    'https://todo-bdb8e-default-rtdb.europe-west1.firebasedatabase.app',
  projectId: 'todo-bdb8e',
  storageBucket: 'todo-bdb8e.appspot.com',
  messagingSenderId: '223481973530',
  appId: '1:223481973530:web:e3a867408053baecb13aa3',
  measurementId: 'G-DZVLE5S8T8',
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
