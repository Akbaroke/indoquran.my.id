function calculatePercentage(
  currentTime: string,
  targetStart: string,
  targetEnd: string
) {
  const [currentHour, currentMinute] = currentTime.split(':').map(Number);
  const [startHour, startMinute] = targetStart.split(':').map(Number);
  const [endHour, endMinute] = targetEnd.split(':').map(Number);

  const currentTimeInMinutes = currentHour * 60 + currentMinute;
  const targetStartInMinutes = startHour * 60 + startMinute;
  const targetEndInMinutes = endHour * 60 + endMinute;

  const totalDuration = targetEndInMinutes - targetStartInMinutes;
  const elapsedTime = currentTimeInMinutes - targetStartInMinutes;

  let percentage = Math.round((elapsedTime / totalDuration) * 100);
  percentage = Math.min(100, Math.max(0, percentage));

  return percentage;
}

export default calculatePercentage;
