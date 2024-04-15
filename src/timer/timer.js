import React, { Component } from 'react';

import './times.css';

export default class Timer extends Component {
  state = {
    currentTime: 0,
  };

  timerInterval = null;

  onPlayClick = () => {
    if (!this.timerInterval) {
      this.timerInterval = setInterval(() => {
        this.setState((prevState) => ({
          currentTime: prevState.currentTime + 1,
        }));
      }, 1000);
    }
  };

  onPauseClick = () => {
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
      this.timerInterval = null;
    }
  };

  render() {
    return (
      <span className="description">
        <button className="icon icon-play" onClick={this.onPlayClick}></button>
        <button className="icon icon-pause" onClick={this.onPauseClick}></button>
        <span className="timer__span">{this.state.currentTime}</span>
      </span>
    );
  }
}
