import React, { Component } from 'react';
import { formatDistanceToNow } from 'date-fns';
import { createRoot } from 'react-dom/client';

import Header from './header/header';
import TodoList from './todo-list/todo-list';
import Footer from './footer/footer';

import './index.css';

class App extends Component {
  maxId = 100;

  state = {
    todoData: [
      this.createTodoItem('Completed task', 'completed'),
      this.createTodoItem('Editing task', 'editing'),
      this.createTodoItem('Active task', 'view'),
    ],
    filter: 'all',
    timerIntervals: {},
  };

  createTodoItem(label, classic = 'view') {
    return {
      label,
      classic,
      timeLabel: 'Created ' + formatDistanceToNow(new Date(), { includeSeconds: true }) + ' ago',
      timeReal: JSON.stringify(new Date()),
      completed: classic === 'completed' ? true : false,
      id: this.maxId++,
      timerTime: 0,
    };
  }

  toogleProperty(arr, id, propName) {
    return arr.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          [propName]: !item[propName],
        };
      }
      return item;
    });
  }

  componentDidMount() {
    this.updateTimeInterval = setInterval(this.updateTimeCreated, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.updateTimeInterval);
  }

  updateTimeCreated = () => {
    this.setState((prevState) => ({
      todoData: prevState.todoData.map((todo) => ({
        ...todo,
        timeLabel: 'Created ' + formatDistanceToNow(JSON.parse(todo.timeReal), { includeSeconds: true }) + ' ago',
      })),
    }));
  };

  onAddItem = (label) => {
    const newItem = this.createTodoItem(label);

    this.setState(({ todoData }) => {
      const newArray = [...todoData, newItem];
      return {
        todoData: newArray,
      };
    });
  };

  onFiltterItems = (filterValue) => {
    this.setState({
      filter: filterValue,
    });
  };

  deleteItem = (id) => {
    this.setState(({ todoData }) => {
      const idx = todoData.findIndex((el) => el.id === id);
      const newArray = todoData.slice(0, idx).concat(todoData.slice(idx + 1));
      return {
        todoData: newArray,
      };
    });
  };

  deleteCompletedItems = () => {
    this.setState(({ todoData }) => {
      const newArray = todoData.filter((el) => !el.completed);
      return {
        todoData: newArray,
      };
    });
  };

  timerInterval = this.state.todoData.reduce((acc, el) => {
    acc[el.id] = null;
    return acc;
  }, {});

  increaseTimer = (id) => {
    this.setState((prevState) => ({
      todoData: prevState.todoData.map((todo) => {
        if (todo.id === id) {
          return {
            ...todo,
            timerTime: todo.timerTime + 1,
          };
        }
        return todo;
      }),
    }));
  };
  onPlayClick = (id) => {
    if (!this.state.timerIntervals[id]) {
      const timerInterval = setInterval(() => this.increaseTimer(id), 1000);
      this.setState((prevState) => ({
        timerIntervals: {
          ...prevState.timerIntervals,
          [id]: timerInterval,
        },
      }));
    }
  };

  onPauseClick = (id) => {
    clearInterval(this.state.timerIntervals[id]);
    this.setState((prevState) => ({
      timerIntervals: {
        ...prevState.timerIntervals,
        [id]: null,
      },
    }));
  };

  onToogleCompleted = (id) => {
    this.setState(({ todoData }) => {
      return {
        todoData: this.toogleProperty(todoData, id, 'completed'),
      };
    });
  };

  render() {
    const { todoData, filter } = this.state;

    let filteredTodos;
    if (filter === 'active') {
      filteredTodos = todoData.filter((todo) => !todo.completed);
    } else if (filter === 'completed') {
      filteredTodos = todoData.filter((todo) => todo.completed);
    } else {
      filteredTodos = todoData;
    }

    const completedCount = todoData.filter((todo) => todo.completed).length;
    const unCompletedCount = todoData.length - completedCount;

    return (
      <section className="todoapp">
        <Header onAddItem={this.onAddItem} />
        <section className="main">
          <TodoList
            todos={filteredTodos}
            onDeleted={this.deleteItem}
            onToogleCompleted={this.onToogleCompleted}
            onPlayClick={this.onPlayClick}
            onPauseClick={this.onPauseClick}
          />
          <Footer
            unCompletedCount={unCompletedCount}
            todos={todoData}
            onFiltterItems={this.onFiltterItems}
            deleteCompletedItems={this.deleteCompletedItems}
          />
        </section>
      </section>
    );
  }
}

createRoot(document.getElementById('root')).render(<App />);
