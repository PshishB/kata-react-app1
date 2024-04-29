import React from 'react';
import PropTypes from 'prop-types';

import './todo-list-item.css';
import Timer from '../timer/timer';

const TodoListItem = ({
  label,
  timeLabel,
  onToogleCompleted,
  onDeleted,
  completed,
  timerTime,
  onPauseClick,
  onPlayClick,
}) => {
  let classNames = '';
  if (completed) {
    classNames += ' completed';
  }
  return (
    <div className="view">
      <input className="toggle" type="checkbox" onChange={onToogleCompleted} checked={completed} />
      <label className={classNames}>
        <span className="description">{label}</span>
        <Timer timerTime={timerTime} onPauseClick={onPauseClick} onPlayClick={onPlayClick} />
        <span className="created">{timeLabel}</span>
      </label>
      <button className="icon icon-edit"></button>
      <button className="icon icon-destroy" onClick={onDeleted}></button>
    </div>
  );
};

TodoListItem.propTypes = {
  label: PropTypes.string.isRequired,
  timeLabel: PropTypes.string,
};

TodoListItem.defaultProps = {
  completed: false,
};
export default TodoListItem;
