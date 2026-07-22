import React, { useState, useEffect } from 'react';

const TARGET_DATE = new Date('2026-12-14T13:30:00').getTime();

export default function Countdown() {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  function calculateTimeLeft() {
    const now = new Date().getTime();
    const difference = TARGET_DATE - now;

    if (difference <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0, isPast: true };
    }

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);

    return { days, hours, minutes, seconds, isPast: false };
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatNumber = (num) => {
    return String(num).padStart(2, '0');
  };

  const units = [
    { label: 'Days', value: formatNumber(timeLeft.days) },
    { label: 'Hours', value: formatNumber(timeLeft.hours) },
    { label: 'Minutes', value: formatNumber(timeLeft.minutes) },
    { label: 'Seconds', value: formatNumber(timeLeft.seconds) },
  ];

  return (
    <div className="countdown-container" aria-label="Countdown to wedding date">
      <div className="countdown-grid">
        {units.map((unit) => (
          <div key={unit.label} className="countdown-card glass-card">
            <span className="countdown-value font-serif">{unit.value}</span>
            <span className="countdown-label">{unit.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
