import React from 'react';
import {
  useSelector,
  //  shallowEqual
} from 'react-redux';
import TodoListItem from './TodoListItem';
import { selectFilteredTodoIds } from './todosSlice';

const TodoList = () => {
  const todoIds = useSelector(selectFilteredTodoIds);
  const loadingStatus = useSelector((state) => state.todos.status);

  if (loadingStatus === 'loading') {
    return (
      <div className="todo-list">
        <div className="loader" />
      </div>
    );
  }

  const renderListItems = todoIds.map((todoId) => (
    <TodoListItem key={todoId} id={todoId} />
  ));

  return <ul className="todo-list">{renderListItems}</ul>;
};

export default TodoList;
