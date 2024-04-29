import React from 'react';

import './times.css';

const Timer = ({ onPlayClick, onPauseClick, timerTime }) => {
  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;
    return `${formattedMinutes}:${formattedSeconds}`;
  };
  return (
    <span className="description">
      <button className="icon icon-play" onClick={onPlayClick}></button>
      <button className="icon icon-pause" onClick={onPauseClick}></button>
      <span className="timer__span">{formatTime(timerTime)}</span>
    </span>
  );
};

export default Timer;
