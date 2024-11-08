import * as React from "react";
import "../assets/css/constants.css";
import "../assets/css/styles.css";

import { useState, useEffect } from "react";

export default function GameRequestCountdown({
  requestedUsername,
  countdownFinished,
}) {
  // countdown 60s
  const [seconds, setSeconds] = useState(60);

  useEffect(() => {
    // Exit early if countdown is finished
    if (seconds <= 0) {
      countdownFinished();
      return;
    }

    // Set up the timer
    const timer = setInterval(() => {
      setSeconds(seconds - 1);
    }, 1000);

    // Clean up the timer
    return () => clearInterval(timer);
  }, [seconds, countdownFinished]);

  // // Format the remaining time (e.g., “00:05:10” for 5 minutes and 10 seconds)
  // const formatTime = (timeInSeconds) => {
  // const minutes = Math.floor(timeInSeconds / 60)
  // .toString()
  // .padStart(2, ‘0’);
  // const seconds = (timeInSeconds % 60).toString().padStart(2, ‘0’);
  // return `${minutes}:${seconds}`;
  // };

  return (
    <p className="request-countdown">
      Request for game with <span>{requestedUsername}</span> is in progress,{" "}
      <b>{seconds}s</b> left
    </p>
  );
}
