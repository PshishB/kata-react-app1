import React, { useEffect, useState } from 'react';
import { formatDistanceToNow } from 'date-fns';
import { createRoot } from 'react-dom/client';

import Header from './header/header';
import TodoList from './todo-list/todo-list';
import Footer from './footer/footer';

import './index.css';

const App = () => {
  let maxId = 100;

  const createTodoItem = (label, classic = 'view') => {
    return {
      label,
      classic,
      timeLabel: 'Created ' + formatDistanceToNow(new Date(), { includeSeconds: true }) + ' ago',
      timeReal: JSON.stringify(new Date()),
      completed: classic === 'completed' ? true : false,
      id: maxId++,
      timerTime: 0,
    };
  };

  const [todoData, setTodoData] = useState([
    createTodoItem('Completed task', 'completed'),
    createTodoItem('Editing task', 'editing'),
    createTodoItem('Active task', 'view'),
  ]);

  const [filter, setFilter] = useState('all');

  const [timerIntervals, setTimerIntervals] = useState({});

  const toogleProperty = (arr, id, propName) => {
    return arr.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          [propName]: !item[propName],
        };
      }
      return item;
    });
  };

  const updateTimeCreated = () => {
    setTodoData((prevTodoData) => {
      return prevTodoData.map((todo) => ({
        ...todo,
        timeLabel:
          'Created ' + formatDistanceToNow(new Date(JSON.parse(todo.timeReal)), { includeSeconds: true }) + ' ago',
      }));
    });
  };

  useEffect(() => {
    const updateTimeInterval = setInterval(updateTimeCreated, 1000);
    return () => clearInterval(updateTimeInterval);
  }, []);

  const onAddItem = (label) => {
    const newItem = createTodoItem(label);
    setTodoData((prevTodoData) => [...prevTodoData, newItem]);
  };

  const onFiltterItems = (filterValue) => {
    setFilter(filterValue);
  };

  const deleteItem = (id) => {
    setTodoData((prevTodoData) => {
      const idx = prevTodoData.findIndex((el) => el.id === id);
      return [...prevTodoData.slice(0, idx), ...prevTodoData.slice(idx + 1)];
    });
  };

  const increaseTimer = (id) => {
    setTodoData((prevTodoData) =>
      prevTodoData.map((todo) => {
        if (todo.id === id) {
          return {
            ...todo,
            timerTime: todo.timerTime + 1,
          };
        }
        return todo;
      })
    );
  };

  const onPlayClick = (id) => {
    if (!timerIntervals[id]) {
      const timerInterval = setInterval(() => increaseTimer(id), 1000);
      setTimerIntervals((prevTimerIntervals) => ({
        ...prevTimerIntervals,
        [id]: timerInterval,
      }));
    }
  };

  const onPauseClick = (id) => {
    clearInterval(timerIntervals[id]);
    setTimerIntervals((prevTimerIntervals) => ({
      ...prevTimerIntervals,
      [id]: null,
    }));
  };

  const deleteCompletedItems = () => {
    setTodoData((prevTodoData) => prevTodoData.filter((el) => !el.completed));
  };

  const onToogleCompleted = (id) => {
    setTodoData((prevTodoData) => toogleProperty(prevTodoData, id, 'completed'));
  };

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
      <Header onAddItem={onAddItem} />
      <section className="main">
        <TodoList
          todos={filteredTodos}
          onDeleted={deleteItem}
          onToogleCompleted={onToogleCompleted}
          onPlayClick={onPlayClick}
          onPauseClick={onPauseClick}
        />
        <Footer
          unCompletedCount={unCompletedCount}
          todos={todoData}
          onFiltterItems={onFiltterItems}
          deleteCompletedItems={deleteCompletedItems}
        />
      </section>
    </section>
  );
};

createRoot(document.getElementById('root')).render(<App />);
