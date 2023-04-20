import { toHijri } from 'hijri-converter'

export default function getTimeHijriah(): string {
  const now = new Date()
  const year = now.toLocaleDateString('id-ID', { year: 'numeric' })
  const month = now.toLocaleDateString('id-ID', { month: 'numeric' })
  const day = now.toLocaleDateString('id-ID', { day: 'numeric' })

  const result = toHijri(parseInt(year), parseInt(month), parseInt(day))

  const islamicMonths: { [key: number]: string } = {
    1: 'Muharram',
    2: 'Safar',
    3: 'Rabiul Awal',
    4: 'Rabiul Akhir',
    5: 'Jumadil Awal',
    6: 'Jumadil Akhir',
    7: 'Rajab',
    8: "Sya'ban",
    9: 'Ramadan',
    10: 'Syawal',
    11: 'Zulkaidah',
    12: 'Dzulhijjah',
  }
  const monthName = islamicMonths[result.hm]
  return `${result.hd} ${monthName}, ${result.hy}`
}
