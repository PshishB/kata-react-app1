import React from 'react';
import PropTypes from 'prop-types';

import TodoFilter from '../todo-filter';
import './footer.css';

const Footer = ({ unCompletedCount, todoData, onFiltterItems, deleteCompletedItems }) => {
  return (
    <footer className="footer">
      <span className="todo-count">{unCompletedCount} time left</span>
      <TodoFilter todos={todoData} onFiltterItems={onFiltterItems} />
      <button className="clear-completed" onClick={deleteCompletedItems}>
        clear completed
      </button>
    </footer>
  );
};

Footer.propTypes = {
  todoData: PropTypes.arrayOf(PropTypes.object),
};

Footer.defaultProps = {
  unCompletedCount: () => {},
  onFiltterItems: () => {},
  deleteCompletedItems: () => {},
};

export default Footer;
