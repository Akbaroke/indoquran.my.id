const countdown = (milliseconds: number, now: Date): string => {
  const epoch_time = now.getTime() + milliseconds

  const diff = epoch_time - now.getTime()

  const diff_seconds = Math.floor(diff / 1000) % 60
  const diff_minutes = Math.floor(diff / (1000 * 60)) % 60
  const diff_hours = Math.floor(diff / (1000 * 60 * 60)) % 24

  return `${diff_hours.toString().padStart(2, '0')}:${diff_minutes
    .toString()
    .padStart(2, '0')}:${diff_seconds.toString().padStart(2, '0')}`
}

export default countdown
