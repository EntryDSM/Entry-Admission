import { useState, useEffect } from 'react';

interface Schedule {
  type: string;
  date: string;
}

export const useRemainingTime = (
  schedules?: Schedule[],
  hasApplication?: boolean
) => {
  const [remainingTime, setRemainingTime] = useState<string>('');
  const [isAvailable, setIsAvailable] = useState<boolean>(false);

  useEffect(() => {
    if (!schedules || hasApplication) return;

    const calculateRemainingTime = () => {
      const startDateSchedule = schedules.find((s) => s.type === 'START_DATE');
      const endDateSchedule = schedules.find((s) => s.type === 'END_DATE');

      if (!startDateSchedule || !endDateSchedule) {
        setIsAvailable(false);
        return;
      }

      const startDate = new Date(startDateSchedule.date);
      const endDate = new Date(endDateSchedule.date);
      const now = new Date();

      // 접수 시작 전
      if (now < startDate) {
        setRemainingTime('접수 시작 전');
        setIsAvailable(false);
        return;
      }

      const diff = endDate.getTime() - now.getTime();

      // 접수 마감
      if (diff <= 0) {
        setRemainingTime('접수 마감');
        setIsAvailable(false);
        return;
      }

      // 접수 기간 내
      setIsAvailable(true);

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      if (days > 0) {
        setRemainingTime(`${days}일 ${hours}시간 ${minutes}분 ${seconds}초`);
      } else {
        setRemainingTime(`${hours}시간 ${minutes}분 ${seconds}초`);
      }
    };

    calculateRemainingTime();
    const interval = setInterval(calculateRemainingTime, 1000);

    return () => clearInterval(interval);
  }, [schedules, hasApplication]);

  return { remainingTime, isAvailable };
};
