import { createStore, applyMiddleware } from 'redux';
import rootReducer from './features/reducer';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunkMiddleware from 'redux-thunk';

let preloadedState;
const persistedTodosString = localStorage.getItem('todos');

if (persistedTodosString) {
  preloadedState = { todos: JSON.parse(persistedTodosString) };
}

const composedEnhancer = composeWithDevTools(applyMiddleware(thunkMiddleware));

const store = createStore(rootReducer, preloadedState, composedEnhancer);

export default store;
