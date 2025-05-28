'use client';

import { useEffect, useState } from "react";

interface TimeInfo {
  time: Date;
  timezone: string;
  timezoneOffset: number;
  isDST: boolean;
}

export function useCurrentTime(updateInterval: number = 1000) {
  const [timeInfo, setTimeInfo] = useState<TimeInfo | null>(null);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
      const timezoneOffset = now.getTimezoneOffset();

      const january = new Date(now.getFullYear(), 0, 1);
      const july = new Date(now.getFullYear(), 6, 1);
      const isDST =
        Math.max(january.getTimezoneOffset(), july.getTimezoneOffset()) !== now.getTimezoneOffset();

      setTimeInfo({
        time: now,
        timezone,
        timezoneOffset,
        isDST,
      });
    };

    updateTime();
    const interval = setInterval(updateTime, updateInterval);
    return () => clearInterval(interval);
  }, [updateInterval]);

  return timeInfo;
}
