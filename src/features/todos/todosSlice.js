import { createSelector, createSlice } from '@reduxjs/toolkit';
import { client } from '../../api/client';
import { StatusFilters } from '../filters/filtersSlice';
const { All, Completed } = StatusFilters;

// const nextTodoId = (todos) => {
//   const maxId = todos.reduce((maxId, todo) => Math.max(todo.id, maxId), -1);

//   return maxId + 1;
// };

const initialState = { status: 'idle', entities: {} };

const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    todoAdded({ entities }, { payload: todo }) {
      entities[todo.id] = todo;
    },
    todoToggled({ entities }, { payload: todoId }) {
      const todo = entities[todoId];
      todo.completed = !todo.completed;
    },
    todosLoading(state) {
      state.status = 'loading';
    },
    todosLoaded(state, { payload }) {
      state.status = 'idle';
      state.entities = payload;
    },
    todoDeleted({ entities }, { payload }) {
      delete entities[payload];
    },
    markAllCompleted({ entities }) {
      Object.values(entities).forEach((todo) => (todo.completed = true));
    },
    clearAllCompleted({ entities }) {
      Object.values(entities).forEach(
        (todo) => todo.completed && delete entities[todo.id]
      );
    },
    todoColorSelected: {
      reducer({ entities }, { payload: { color, todoId } }) {
        entities[todoId].color = color;
      },
      prepare(todoId, color) {
        return { payload: { todoId, color } };
      },
    },
  },
});

export const {
  todosLoaded,
  todoAdded,
  todosLoading,
  todoColorSelected,
  clearAllCompleted,
  markAllCompleted,
  todoDeleted,
  todoToggled,
} = todosSlice.actions;

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

export const selectTodoEntities = (state) => state.todos.entities;

export const selectTodos = createSelector(selectTodoEntities, (entities) =>
  Object.values(entities)
);

export const selectTodoById = (state, todoId) =>
  selectTodoEntities(state)[todoId];

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

export default todosSlice.reducer;
