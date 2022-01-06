import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { saveNewTodo } from '../todos/todosSlice';

const Header = () => {
  const [text, setText] = useState('');
  const dispatch = useDispatch();

  const handleChange = ({ target }) => setText(target.value);

  const handleEnterKeyDown = ({ key }) => {
    const trimmedText = text.trim();
    if (key !== 'Enter' || !trimmedText) {
      return;
    }

    const saveNewTodoThunk = saveNewTodo(trimmedText);
    dispatch(saveNewTodoThunk);

    setText('');
  };

  return (
    <header className="header">
      <input
        autoFocus={true}
        type="text"
        className="new-todo"
        placeholder="What needs to be done?"
        value={text}
        onChange={handleChange}
        onKeyDown={handleEnterKeyDown}
      />
    </header>
  );
};

export default Header;
