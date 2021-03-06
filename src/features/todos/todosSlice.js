import {
  createSelector,
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from '@reduxjs/toolkit';
import { client } from '../../api/client';
import { StatusFilters } from '../filters/filtersSlice';
const { All, Completed } = StatusFilters;

// const nextTodoId = (todos) => {
//   const maxId = todos.reduce((maxId, todo) => Math.max(todo.id, maxId), -1);

//   return maxId + 1;
// };

const todosAdapter = createEntityAdapter();

const initialState = todosAdapter.getInitialState({
  status: 'idle',
});

const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    todoToggled({ entities }, { payload: todoId }) {
      const todo = entities[todoId];
      todo.completed = !todo.completed;
    },
    todoDeleted: todosAdapter.removeOne,
    markAllCompleted({ entities }) {
      Object.values(entities).forEach((todo) => (todo.completed = true));
    },
    clearAllCompleted(state, action) {
      const completedIds = Object.values(state.entities)
        .filter((todo) => todo.completed)
        .map((todo) => todo.id);

      todosAdapter.removeMany(state, completedIds);
    },
    todoColorSelected: {
      reducer({ entities }, { payload: { color, todoId } }) {
        entities[todoId].color = color;
      },
      prepare: (todoId, color) => ({ payload: { todoId, color } }),
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(fetchTodos.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        todosAdapter.setAll(state, action.payload);

        state.status = 'idle';
      })
      .addCase(saveNewTodo.fulfilled, todosAdapter.addOne),
});

export const {
  todoColorSelected,
  clearAllCompleted,
  markAllCompleted,
  todoDeleted,
  todoToggled,
} = todosSlice.actions;

// Thunk functions start
export const saveNewTodo = createAsyncThunk(
  'todo/saveNewTodo',
  async (text) => {
    const initialTodo = { text };
    const response = await client.post('/fakeApi/todos', { todo: initialTodo });

    return response.todo;
  }
);

export const fetchTodos = createAsyncThunk('todos/fetchTodos', async () => {
  const response = await client.get('/fakeApi/todos');

  return response.todos;
});
// Thunk functions end

export const { selectAll: selectTodos, selectById: selectTodoById } =
  todosAdapter.getSelectors((state) => state.todos);

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
