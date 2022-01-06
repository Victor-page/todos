import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import StatusFilter from './StatusFilter';
import ColorFilters from './ColorFilters';
import RemainingTodos from './RemainingTodos';

const deriveRemainingTodos = (state) => {
  const uncompletedTodos = state.todos.filter((todo) => !todo.completed);

  return uncompletedTodos.length;
};

const getFilters = (state) => state.filters;

const Footer = () => {
  const dispatch = useDispatch();
  const todosRemaining = useSelector(deriveRemainingTodos);

  const { status, colors } = useSelector(getFilters);

  const onColorChange = (color, changeType) => {
    console.log('Color change: ', { color, changeType });
    dispatch({
      type: 'filters/colorFilterChanged',
      payload: { color, changeType },
    });
  };

  const onStatusChange = (status) => {
    console.log('Status change: ', status);
    dispatch({ type: 'filters/statusFilterChanged', payload: status });
  };

  const markAllCompleted = () => dispatch({ type: 'todos/markAllCompleted' });

  const clearCompleted = () => dispatch({ type: 'todos/clearAllCompleted' });

  return (
    <footer className="footer">
      <div className="actions">
        <h5>Actions</h5>
        <button className="button" onClick={markAllCompleted}>
          Mark All Completed
        </button>
        <button className="button" onClick={clearCompleted}>
          Clear Completed
        </button>
      </div>

      <RemainingTodos count={todosRemaining} />
      <StatusFilter value={status} onChange={onStatusChange} />
      <ColorFilters value={colors} onChange={onColorChange} />
    </footer>
  );
};

export default Footer;
