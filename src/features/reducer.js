import { combineReducers } from 'redux';
import todosReducer from './todos/todosSlice';
import filtersReducer from './filters/filtersSlice';

const rootReducer = combineReducers({
  todos: todosReducer,
  filters: filtersReducer,
});

export default rootReducer;
