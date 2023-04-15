export const CountDownTime = (epoch_time = 0, now: Date): string => {
  const date = new Date(epoch_time)
  const diff = now.getTime() - date.getTime()

  const diff_seconds = diff / 1000
  const diff_minutes = diff_seconds / 60
  const diff_hours = diff_minutes / 60
  const diff_days = diff_hours / 24
  const diff_weeks = diff_days / 7

  if (diff_seconds < 60) {
    return Math.floor(diff_seconds) + ' detik lalu'
  } else if (diff_minutes < 60) {
    return Math.floor(diff_minutes) + ' menit lalu'
  } else if (diff_hours < 24) {
    return Math.floor(diff_hours) + ' jam lalu'
  } else if (diff_days < 7) {
    return Math.floor(diff_days) + ' hari lalu'
  } else if (diff_weeks < 52) {
    const monthNames = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Okt',
      'Nov',
      'Des',
    ]
    const month = monthNames[date.getMonth()]
    const day = date.getDate()
    const year = date.getFullYear()
    return `${month} ${day} ${year}`
  } else {
    return `${date.toLocaleDateString()}`
  }
}
