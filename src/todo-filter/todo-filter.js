import React, { Component } from 'react';

import './todo-filter.css';

export default class TodoFilter extends Component {
  state = {
    selectedFilter: 'all',
  };

  handleFilterClick = (filterValue) => {
    this.setState({ selectedFilter: filterValue });
    this.props.onFiltterItems(filterValue);
  };

  render() {
    return (
      <ul className="filters">
        <li>
          <button
            className={this.state.selectedFilter === 'all' ? 'selected' : ''}
            onClick={() => this.handleFilterClick('all')}
          >
            {' '}
            All
          </button>
        </li>
        <li>
          <button
            className={this.state.selectedFilter === 'active' ? 'selected' : ''}
            onClick={() => this.handleFilterClick('active')}
          >
            Active
          </button>
        </li>
        <li>
          <button
            className={this.state.selectedFilter === 'completed' ? 'selected' : ''}
            onClick={() => this.handleFilterClick('completed')}
          >
            Completed
          </button>
        </li>
      </ul>
    );
  }
}
