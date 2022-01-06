import { client } from '../../api/client';

const nextTodoId = (todos) => {
  const maxId = todos.reduce((maxId, todo) => Math.max(todo.id, maxId), -1);

  return maxId + 1;
};

const todosReducer = (state = [], action) => {
  switch (action.type) {
    case 'todos/todosLoaded': {
      return action.payload;
    }

    case 'todos/todoAdded': {
      return [...state, action.payload];
    }

    case 'todos/todoDeleted': {
      return state.filter((todo) => todo.id !== action.payload);
    }

    case 'todos/todoToggled': {
      return state.map((todo) => {
        if (todo.id !== action.payload) {
          return todo;
        }

        return { ...todo, completed: !todo.completed };
      });
    }

    case 'todos/markAllCompleted': {
      return state.map((todo) => {
        return { ...todo, completed: true };
      });
    }

    case 'todos/clearAllCompleted': {
      return state.filter((todo) => !todo.completed);
    }

    case 'todos/colorSelected': {
      const { color, todoId } = action.payload;

      return state.map((todo) => {
        if (todo.id !== todoId) {
          return todo;
        }

        return { ...todo, color };
      });
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

export const saveNewTodo = (text) => {
  return async (dispatch, getState) => {
    const initialTodo = { text };
    const response = await client.post('/fakeApi/todos', { todo: initialTodo });
    dispatch({ type: 'todos/todoAdded', payload: response.todo });
  };
};

export const fetchTodos = async (dispatch, getState) => {
  const response = await client.get('/fakeApi/todos');

  // const stateBefore = getState();
  // console.log('Todos before dispatch: ', stateBefore.todos.length);

  dispatch({ type: 'todos/todosLoaded', payload: response.todos });

  // const stateAfter = getState();
  // console.log('Todos after dispatch: ', stateAfter.todos.length);
};

export default todosReducer;
