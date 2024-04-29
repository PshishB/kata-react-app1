import React, { useState } from 'react';

import './todo-filter.css';

const TodoFilter = (props) => {
  const [selectedFilter, setSelectedFilter] = useState('all');

  const handleFilterClick = (filterValue) => {
    setSelectedFilter(filterValue);
    props.onFiltterItems(filterValue);
  };

  return (
    <ul className="filters">
      <li>
        <button className={selectedFilter === 'all' ? 'selected' : ''} onClick={() => handleFilterClick('all')}>
          {' '}
          All
        </button>
      </li>
      <li>
        <button className={selectedFilter === 'active' ? 'selected' : ''} onClick={() => handleFilterClick('active')}>
          Active
        </button>
      </li>
      <li>
        <button
          className={selectedFilter === 'completed' ? 'selected' : ''}
          onClick={() => handleFilterClick('completed')}
        >
          Completed
        </button>
      </li>
    </ul>
  );
};

export default TodoFilter;
