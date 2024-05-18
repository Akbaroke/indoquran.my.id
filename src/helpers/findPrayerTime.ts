interface PrayerTimes {
  [key: string]: string;
}

interface Player {
  time: string;
  prayerName: string;
}

function findNextPrayerTime(
  prayerTimes: PrayerTimes | any,
  currentTime: string
): Player | null {
  const [currentHourStr, currentMinuteStr] = currentTime.split(':');
  const currentHour = parseInt(currentHourStr);
  const currentMinute = parseInt(currentMinuteStr);

  const formattedCurrentTime = currentHour * 60 + currentMinute;

  let closestTime: string | null = null;
  let closestDifference = Infinity;

  for (const prayerTime in prayerTimes) {
    if (Object.prototype.hasOwnProperty.call(prayerTimes, prayerTime)) {
      const time = prayerTimes[prayerTime].split(':');
      const prayerHour = parseInt(time[0]);
      const prayerMinute = parseInt(time[1]);
      const prayerTimeMinutes = prayerHour * 60 + prayerMinute;

      // Perhitungan untuk waktu berikutnya hanya jika lebih besar dari waktu sekarang
      if (prayerTimeMinutes > formattedCurrentTime) {
        const timeDifference = prayerTimeMinutes - formattedCurrentTime;

        if (timeDifference < closestDifference) {
          closestTime = prayerTime;
          closestDifference = timeDifference;
        }
      }
    }
  }

  if (closestTime) {
    return { time: prayerTimes[closestTime], prayerName: closestTime };
  } else {
    return null;
  }
}

function findPrevPlayerTime(
  prayerTimes: PrayerTimes | any,
  currentTime: string
): Player | null {
  const [currentHourStr, currentMinuteStr] = currentTime.split(':');
  const currentHour = parseInt(currentHourStr);
  const currentMinute = parseInt(currentMinuteStr);

  const formattedCurrentTime = currentHour * 60 + currentMinute;

  let closestTime: string | null = null;
  let closestDifference = Infinity;

  for (const prayerTime in prayerTimes) {
    if (Object.prototype.hasOwnProperty.call(prayerTimes, prayerTime)) {
      const time = prayerTimes[prayerTime].split(':');
      const prayerHour = parseInt(time[0]);
      const prayerMinute = parseInt(time[1]);
      const prayerTimeMinutes = prayerHour * 60 + prayerMinute;

      // Perhitungan untuk waktu sebelumnya hanya jika lebih kecil dari waktu sekarang
      if (prayerTimeMinutes < formattedCurrentTime) {
        const timeDifference = formattedCurrentTime - prayerTimeMinutes;

        if (timeDifference < closestDifference) {
          closestTime = prayerTime;
          closestDifference = timeDifference;
        }
      }
    }
  }

  if (closestTime) {
    return { time: prayerTimes[closestTime], prayerName: closestTime };
  } else {
    return null;
  }
}

export { findNextPrayerTime, findPrevPlayerTime };
