import React from 'react';
import PropTypes from 'prop-types';

import TodoListItem from '../todo-list-item/todo-list-item';
import './todo-list.css';

const TodoList = ({ todos, onDeleted, onToogleCompleted }) => {
  const elements = todos.map((item) => {
    const { id, ...itemProps } = item;

    return (
      <li key={id}>
        <TodoListItem {...itemProps} onDeleted={() => onDeleted(id)} onToogleCompleted={() => onToogleCompleted(id)} />
      </li>
    );
  });

  return <ul className="todo-list">{elements}</ul>;
};

TodoList.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.object),
};

TodoList.defaultProps = {
  onDeleted: () => {},
  onToogleCompleted: () => {},
};

export default TodoList;
