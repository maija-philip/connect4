import * as React from "react";
import "../assets/css/constants.css";
import "../assets/css/styles.css";

import { useState, useEffect } from "react";

// logic from: https://rathoreaparna678.medium.com/how-to-create-a-countdown-timer-with-react-89ef8466bd7c

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


  return (
    <p className="request-countdown">
      Request for game with <span>{requestedUsername}</span> is in progress,{" "}
      <b>{seconds}s</b> left
    </p>
  );
}
