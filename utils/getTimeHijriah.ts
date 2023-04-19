export default function getTimeHijriah(): string {
  const date: Date = new Date()
  const timestamp: number = Math.floor(date.getTime() / 1000)
  const hijriah: Intl.DateTimeFormat = new Intl.DateTimeFormat(
    'en-US-u-ca-islamic',
    {
      timeZone: 'UTC',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    }
  )
  const hijriahDate: string = hijriah.format(timestamp * 1000)

  const formattedHijriahDate: string = hijriahDate
    .replace(/(\w+)\s(\d{1,2}),\s(\d{4})/g, '$2 $1, $3')
    .replace('AH', '')

  return formattedHijriahDate
}
