export default function isTimePassed(time: string): boolean {
  const currentTime = new Date()
  const [hours, minutes] = time.split(':').map(Number)
  const targetTime = new Date(
    currentTime.getFullYear(),
    currentTime.getMonth(),
    currentTime.getDate(),
    hours,
    minutes
  )
  return targetTime.getTime() < currentTime.getTime()
}
