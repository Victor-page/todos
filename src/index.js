import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import store from './store';
import './api/server';
import { Provider } from 'react-redux';

// console.log('Initial state: ', store.getState());

// store.subscribe(() => console.log('State after dispatch: ', store.getState()));

// store.dispatch({ type: 'todos/todoAdded', payload: 'Learn about actions' });
// store.dispatch({ type: 'todos/todoAdded', payload: 'Learn about reducers' });

import { fetchTodos } from './features/todos/todosSlice';
store.dispatch(fetchTodos);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
