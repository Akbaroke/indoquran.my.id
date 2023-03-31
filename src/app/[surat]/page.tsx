'use client'
import * as React from 'react'
import useSWR from 'swr'
import { ayatSurat, detailSurat } from '@/interfaces'
import {
  IconBookmark,
  IconChevronRight,
  IconExternalLink,
  IconHeadphones,
  IconHeart,
  IconLink,
} from '@tabler/icons-react'
import Link from 'next/link'
import ScrollToTop from '@/components/ScrollToTop'

async function fetchData(surat: string) {
  const res = await fetch(`${process.env.API_URL}/surat/${surat}`)
  const data = await res.json()
  return data.data
}

export default function Page({ params }: { params: { surat: string } }) {
  const [detail, setDetail] = React.useState<detailSurat | undefined>(undefined)
  const [ayats, setAyats] = React.useState<ayatSurat[]>([])
  const ayatRefs = React.useRef<(HTMLDivElement | null)[]>([])
  const { data, error } = useSWR(params.surat, fetchData)
  const [bukaAyat, setBukaAyat] = React.useState<number>(0)

  React.useEffect(() => {
    setDetail(data)
    setAyats(data?.ayat)
    if (data) {
      setTimeout(() => {
        const urlParams = new URLSearchParams(window.location.search)
        const ayat = urlParams.get('ayat')
        ayat && setBukaAyat(parseInt(ayat))
      }, 1000)
    }
  }, [data])

  React.useEffect(() => {
    scrollToAyat(bukaAyat)
  }, [bukaAyat])

  const scrollToAyat = (nomorAyat: number): boolean => {
    const ayatRef = ayatRefs.current[nomorAyat - 1]
    if (ayatRef) {
      window.scrollTo({
        top: ayatRef.offsetTop,
        behavior: 'smooth',
      })
      return true
    } else {
      return false
    }
  }

  const handleChangeAyat = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value: string = event.target.value
    setBukaAyat(parseInt(value))
  }

  if (error) return <div>Failed to load data</div>
  if (!data) return <div>Loading...</div>

  return (
    <div className="max-w-[1107px] h-max m-auto relative">
      <div className="bg-white p-[22px] rounded-[10px] text-center">
        <div>
          <p className="arab text-[24px]">{detail?.nama}</p>
          <p className="text-[24px] font-semibold">{detail?.namaLatin}</p>
          <p className="text-[16px] font-semibold text-[#a5bcc6]">
            {detail?.tempatTurun} • {detail?.arti} • {detail?.jumlahAyat} Ayat
          </p>
          <div className="flex flex-wrap justify-center items-center gap-[20px] mt-[20px] pt-[15px] m-auto border-t-2 border-t-[#f4f4f4]">
            <select
              className="py-[7px] px-[14px] bg-[#f4f6f8] text-[var(--primary)] rounded-[10px] w-[194px] outline-none cursor-pointer"
              onChange={handleChangeAyat}>
              <option value="">Pilih Ayat</option>
              {Array.from({ length: detail?.jumlahAyat || 0 }, (_, i) => (
                <option key={i} value={i + 1}>
                  {' '}
                  Buka Ayat {i + 1}{' '}
                </option>
              ))}
            </select>
            <select className="py-[7px] px-[14px] bg-[#f4f6f8] text-[var(--primary)] rounded-[10px] w-[194px] outline-none cursor-pointer">
              <option value="">Pilih Qori</option>
            </select>
            <Link
              href="/"
              className="flex justify-between items-center py-[7px] px-[14px] bg-[#f4f6f8] text-[var(--primary)] rounded-[10px] w-[194px]">
              <p>Tafsir</p>
              <IconExternalLink className="w-[20px] h-[20px] stroke-[1.5]" />
            </Link>
          </div>
        </div>
      </div>
      <div className="flex gap-2 text-[var(--primary)] font-semibold items-center py-4 px-2 text-[14px]">
        <Link href="/">Daftar Surat</Link>
        <IconChevronRight className="h-4" />
        <p>Baca Ayat</p>
      </div>
      <div className="h-max flex flex-col gap-4">
        {ayats?.map((res, i) => (
          <div
            key={res.nomorAyat}
            className="bg-white rounded-[10px] p-4 flex flex-col gap-2"
            ref={el => (ayatRefs.current[i] = el)}>
            <p className="font-bold text-[var(--primary)] text-[16px]">
              {detail?.nomor} : {res.nomorAyat}
            </p>
            <p className="arab text-end text-[24px]">{res.teksArab}</p>
            <p className="font-semibold text-[14px] text-[var(--primary)] font-Quicksand">
              {res.teksLatin}
            </p>
            <p className="font-semibold text-[14px] font-Quicksand">
              {res.teksIndonesia}
            </p>
            <div className="flex pt-[15px] px-[15px] mt-[15px] gap-[40px] flex-wrap border-t-[1.5px] border-t-[#f4f4f4] text-[#A5BCC6]">
              <IconHeart className="cursor-pointer" />
              <IconBookmark className="cursor-pointer" />
              <IconLink className="cursor-pointer" />
              <IconHeadphones className="cursor-pointer" />
            </div>
          </div>
        ))}
      </div>
      <ScrollToTop />
    </div>
  )
}
