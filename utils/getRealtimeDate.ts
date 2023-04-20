export default function getRealtimeDate(): string {
  const date = new Date()
  const options = {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  } as Intl.DateTimeFormatOptions
  const formattedDate = date
    .toLocaleDateString('en-US', options)
    .replace(/(\w+)\s(\d{1,2}),\s(\d{4})/g, '$2 $1, $3')
  return formattedDate
}
