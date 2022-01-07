import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import StatusFilter from './StatusFilter';
import ColorFilters from './ColorFilters';
import RemainingTodos from './RemainingTodos';
import { colorFilterChanged } from '../filters/filtersSlice';
import { selectRemainingTodos } from '../todos/todosSlice';

const getFilters = (state) => state.filters;

const Footer = () => {
  const dispatch = useDispatch();
  const todosRemaining = useSelector(selectRemainingTodos);

  const { status, colors } = useSelector(getFilters);

  const onColorChange = (color, changeType) =>
    dispatch(colorFilterChanged(color, changeType));

  const onStatusChange = (status) =>
    dispatch({ type: 'filters/statusFilterChanged', payload: status });

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
