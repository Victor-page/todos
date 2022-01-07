import React from 'react';
import {
  useSelector,
  //  shallowEqual
} from 'react-redux';
import TodoListItem from './TodoListItem';
import { selectFilteredTodoIds } from './todosSlice';

const TodoList = () => {
  const todoIds = useSelector(selectFilteredTodoIds);

  const renderListItems = todoIds.map((todoId) => (
    <TodoListItem key={todoId} id={todoId} />
  ));

  return <ul className="todo-list">{renderListItems}</ul>;
};

export default TodoList;
