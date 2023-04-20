/* eslint-disable @typescript-eslint/no-inferrable-types */
export default function getNearestPrayerTime(prayerTimes: {
  [key: string]: string
}): string {
  const currentTime = new Date()
  const currentTimestamp = currentTime.getTime()
  let nearestTime: string = ''
  let nearestDiff: number = Infinity
  for (const [prayer, time] of Object.entries(prayerTimes)) {
    const [hours, minutes] = time.split(':').map(Number)
    const targetTime = new Date(
      currentTime.getFullYear(),
      currentTime.getMonth(),
      currentTime.getDate(),
      hours,
      minutes
    )
    const timeDiff = targetTime.getTime() - currentTimestamp
    if (timeDiff >= 0 && timeDiff < nearestDiff) {
      nearestTime = prayer
      nearestDiff = timeDiff
    }
  }
  return nearestTime
}
