import React from 'react';

import NewTodo from '../new-todo';

const Header = ({ onAddItem }) => {
  return (
    <header className="header">
      <h1>todos</h1>
      <NewTodo onAddItem={(label) => onAddItem(label)} />
    </header>
  );
};

Header.defaultProps = {
  onAddItem: () => {},
};

export default Header;
