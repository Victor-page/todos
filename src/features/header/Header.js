import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { saveNewTodo } from '../todos/todosSlice';

const Header = () => {
  const [text, setText] = useState('');
  const [status, setStatus] = useState('idle');
  const dispatch = useDispatch();

  const handleChange = ({ target }) => setText(target.value);

  const handleEnterKeyDown = async ({ key }) => {
    const trimmedText = text.trim();
    if (key !== 'Enter' || !trimmedText) {
      return;
    }

    setStatus('loading');
    const saveNewTodoThunk = saveNewTodo(trimmedText);
    await dispatch(saveNewTodoThunk);

    setText('');
    setStatus('idle');
  };

  let isLoading = status === 'loading';
  let placeholder = isLoading ? '' : 'What needs to be done?';
  let loader = isLoading && <div className="loader" />;

  return (
    <header className="header">
      <input
        autoFocus={true}
        type="text"
        className="new-todo"
        placeholder={placeholder}
        value={text}
        onChange={handleChange}
        onKeyDown={handleEnterKeyDown}
        disabled={isLoading}
      />
      {loader}
    </header>
  );
};

export default Header;
