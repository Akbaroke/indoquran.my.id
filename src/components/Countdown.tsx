import React, { useEffect, useState, useCallback } from 'react';

interface CountdownResult {
  hours: number;
  minutes: number;
  seconds: number;
  percentage: number;
}

interface CountdownProps {
  targetTime: string;
}

const formatTime = (value: number): string => {
  return value.toString().padStart(2, '0');
};

const Countdown: React.FC<CountdownProps> = ({ targetTime }) => {
  const [countdown, setCountdown] = useState<CountdownResult>({
    hours: 0,
    minutes: 0,
    seconds: 0,
    percentage: 0,
  });

  const calculateCountdown = useCallback(() => {
    const now = new Date();
    const [targetHour, targetMinute] = targetTime.split(':').map(Number);
    const target = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate(),
      targetHour,
      targetMinute
    );
    const totalDifference = target.getTime() - now.getTime();
    let difference = Math.floor(totalDifference / 1000);

    if (difference <= 0) {
      setCountdown({
        hours: 0,
        minutes: 0,
        seconds: 0,
        percentage: 100,
      });
      return;
    }

    const hours = Math.floor(difference / 3600);
    difference %= 3600;
    const minutes = Math.floor(difference / 60);
    const seconds = difference % 60;

    const remainingPercentage = Math.min(
      100,
      (totalDifference / (1000 * 60 * 60 * 24)) * 100
    );

    setCountdown({
      hours: hours,
      minutes: minutes,
      seconds: seconds,
      percentage: 100 - remainingPercentage,
    });
  }, [targetTime]);

  useEffect(() => {
    const interval = setInterval(calculateCountdown, 1000);

    return () => clearInterval(interval);
  }, [calculateCountdown]);

  useEffect(() => {
    calculateCountdown(); // initial calculation
  }, [calculateCountdown]);

  return (
    <p>
      {formatTime(countdown.hours)} : {formatTime(countdown.minutes)} :{' '}
      {formatTime(countdown.seconds)}
    </p>
  );
};

export default Countdown;
