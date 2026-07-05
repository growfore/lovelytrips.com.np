"use client";

import { useEffect, useState } from "react";

function pad(n: number): string {
  return n < 10 ? "0" + n : String(n);
}

export default function CountdownTimer() {
  const [time, setTime] = useState({ days: 0, hours: 0, mins: 0, secs: 0 });
  const [launched, setLaunched] = useState(false);

  useEffect(() => {
    const target = new Date();
    target.setDate(target.getDate() + 30);

    function tick() {
      const now = Date.now();
      const dist = target.getTime() - now;
      if (dist <= 0) {
        setLaunched(true);
        return;
      }
      setTime({
        days: Math.floor(dist / 86400000),
        hours: Math.floor((dist % 86400000) / 3600000),
        mins: Math.floor((dist % 3600000) / 60000),
        secs: Math.floor((dist % 60000) / 1000),
      });
    }

    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  if (launched) {
    return <p className="text-2xl font-bold text-accent">We have launched!</p>;
  }

  const items = [
    { label: "Days", value: time.days },
    { label: "Hours", value: time.hours },
    { label: "Mins", value: time.mins },
    { label: "Secs", value: time.secs },
  ];

  return (
    <div className="flex justify-center gap-3 sm:gap-5">
      {items.map(({ label, value }) => (
        <div
          key={label}
          className="bg-primary text-white flex flex-col items-center rounded-xl px-4 py-3 min-w-[72px] shadow-lg sm:px-5 sm:py-4 sm:min-w-[80px]"
        >
          <span className="text-2xl font-bold sm:text-3xl">{pad(value)}</span>
          <span className="text-xs uppercase tracking-wider opacity-80 mt-1">
            {label}
          </span>
        </div>
      ))}
    </div>
  );
}
