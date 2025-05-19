export function formatMillisecondsToHMS(diff: number): string {
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);

  return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

export function getTodayAtHour(hour: number, minute = 0): Date {
  const today = new Date();
  today.setHours(hour, minute, 0, 0);
  return today;
}
