import React from 'react';
import logo from './logo.svg';
import TodoList from './components/TodoList';
import './App.css';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <>
    <TodoList/>
    <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
}

export default App;
