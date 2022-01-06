import React from 'react';
import { useSelector, shallowEqual } from 'react-redux';
import TodoListItem from './TodoListItem';

const selectTodoIds = (state) => state.todos.map((todo) => todo.id);

const TodoList = () => {
  const todoIds = useSelector(selectTodoIds, shallowEqual);

  const renderListItems = todoIds.map((todoId) => (
    <TodoListItem key={todoId} id={todoId} />
  ));

  return <ul className="todo-list">{renderListItems}</ul>;
};

export default TodoList;
