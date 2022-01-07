import { createSelector } from 'reselect';
import { client } from '../../api/client';
import { StatusFilters } from '../filters/filtersSlice';
const { All, Completed } = StatusFilters;

// const nextTodoId = (todos) => {
//   const maxId = todos.reduce((maxId, todo) => Math.max(todo.id, maxId), -1);

//   return maxId + 1;
// };

const initialState = { status: 'idle', entities: [] };

const todosReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'todos/todosLoading': {
      return { ...state, status: 'loading' };
    }

    case 'todos/todosLoaded': {
      return { ...state, status: 'idle', entities: action.payload };
    }

    case 'todos/todoAdded': {
      return { ...state, entities: [...state.entities, action.payload] };
    }

    case 'todos/todoDeleted': {
      return {
        ...state,
        entities: state.entities.filter((todo) => todo.id !== action.payload),
      };
    }

    case 'todos/todoToggled': {
      return {
        ...state,
        entities: state.entities.map((todo) => {
          if (todo.id !== action.payload) {
            return todo;
          }

          return { ...todo, completed: !todo.completed };
        }),
      };
    }

    case 'todos/markAllCompleted': {
      return {
        ...state,
        entities: state.entities.map((todo) => {
          return { ...todo, completed: true };
        }),
      };
    }

    case 'todos/clearAllCompleted': {
      return {
        ...state,
        entities: state.entities.filter((todo) => !todo.completed),
      };
    }

    case 'todos/colorSelected': {
      const { color, todoId } = action.payload;

      return {
        ...state,
        entities: state.entities.map((todo) => {
          if (todo.id !== todoId) {
            return todo;
          }

          return { ...todo, color };
        }),
      };
    }

    default: {
      return state;
    }
  }
};

export const todosLoaded = (todos) => ({
  type: 'todos/todosLoaded',
  payload: todos,
});

export const todoAdded = (todo) => ({ type: 'todo/todoAdded', payload: todo });

export const todosLoading = () => ({ type: 'todos/todosLoading' });

export const saveNewTodo = (text) => {
  return async (dispatch, getState) => {
    const initialTodo = { text };
    const response = await client.post('/fakeApi/todos', { todo: initialTodo });
    dispatch(todoAdded(response.todo));
  };
};

export const fetchTodos = () => async (dispatch, getState) => {
  dispatch(todosLoading());
  const response = await client.get('/fakeApi/todos');
  dispatch(todosLoaded(response.todos));
};

export const selectTodos = (state) => state.todos.entities;

export const selectTodoById = (state, todoId) =>
  selectTodos(state).find((todo) => todo.id === todoId);

export const selectTodoIds = createSelector(selectTodos, (todos) =>
  todos.map((todo) => todo.id)
);

export const selectFilteredTodos = createSelector(
  selectTodos,
  (state) => state.filters,
  (todos, filters) => {
    const { status, colors } = filters;
    const showAllCompletions = status === All;
    if (showAllCompletions && colors.length === 0) {
      return todos;
    }

    const completedStatus = status === Completed;

    return todos.filter((todo) => {
      const statusMatches =
        showAllCompletions || todo.completed === completedStatus;
      const colorMatches = colors.length === 0 || colors.includes(todo.color);
      return statusMatches && colorMatches;
    });
  }
);

export const selectFilteredTodoIds = createSelector(
  selectFilteredTodos,
  (filteredTodos) => filteredTodos.map((todo) => todo.id)
);

export const selectRemainingTodos = createSelector(selectTodos, (todos) => {
  const uncompletedTodos = todos.filter((todo) => !todo.completed);

  return uncompletedTodos.length;
});

export default todosReducer;
