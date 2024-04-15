import React, { Component } from 'react';

import './times.css';

export default class Timer extends Component {
  formatTime(timeInSeconds) {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;
    return `${formattedMinutes}:${formattedSeconds}`;
  }
  render() {
    return (
      <span className="description">
        <button className="icon icon-play" onClick={this.props.onPlayClick}></button>
        <button className="icon icon-pause" onClick={this.props.onPauseClick}></button>
        <span className="timer__span">{this.formatTime(this.props.timerTime)}</span>
      </span>
    );
  }
}
