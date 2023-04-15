'use client'
import * as React from 'react'
import useSWR from 'swr'
import { ayatTafsir, detailSurat } from '@/interfaces'
import {
  IconChevronRight,
  IconExternalLink,
  IconHeart,
  IconLink,
} from '@tabler/icons-react'
import Link from 'next/link'
import ScrollToTop from '@/components/ScrollToTop'
import { useDispatch } from 'react-redux'
import { modalLoading, modalSorry, unsetModal } from '@/redux/actions/modal'

async function fetchData(nosurat: string) {
  const res = await fetch(`${process.env.API_URL}${nosurat}`)
  const data = await res.json()
  return data.data
}

export default function Page({ params }: { params: { nosurat: string } }) {
  const { data, error } = useSWR(`/tafsir/${params.nosurat}`, fetchData)
  const [detail, setDetail] = React.useState<detailSurat | undefined>(undefined)
  const [ayats, setAyats] = React.useState<ayatTafsir[]>([])
  const ayatRefs = React.useRef<(HTMLDivElement | null)[]>([])
  const [bukaAyat, setBukaAyat] = React.useState<number>(0)
  const dispatch = useDispatch()

  React.useEffect(() => {
    setDetail(data)
    setAyats(data?.tafsir)
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

  React.useEffect(() => {
    dispatch(modalLoading(''))
    function handleScroll() {
      if (window.scrollY < 100) {
        setBukaAyat(0)
      }
    }
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [dispatch])

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

  const handleCopyLink = (ayat: number) => {
    const link = `${window.location.origin}/${params.nosurat}/tafsir?ayat=${ayat}`
    navigator.clipboard.writeText(link)
    alert('Link copied successfully')
  }

  console.log()

  if (error) return <div>Failed to load data</div>
  if (!data) return <div>Loading...</div>
  if (data) {
    setTimeout(() => {
      dispatch(unsetModal())
    }, 1000)
  }

  return (
    <div className="max-w-[1107px] h-max m-auto relative">
      <div className="bg-white p-[22px] rounded-[10px] text-center dark:bg-slate-700/50">
        <div>
          <p className="arab text-[24px]">{detail?.nama}</p>
          <p className="text-[24px] font-semibold">{detail?.namaLatin}</p>
          <p className="text-[16px] font-semibold text-[#a5bcc6]">
            {detail?.tempatTurun} • {detail?.arti} • {detail?.jumlahAyat} Ayat
          </p>
          <div className="flex flex-wrap justify-center items-center gap-[20px] mt-[20px] pt-[15px] m-auto border-t-2 border-t-[#f4f4f4]">
            <select
              className="py-[7px] px-[14px] bg-[#f4f6f8] text-[var(--primary)] rounded-[10px] w-[194px] h-[40px] outline-none cursor-pointer dark:bg-slate-800"
              value={bukaAyat}
              onChange={handleChangeAyat}>
              <option value="">Pilih Ayat</option>
              {Array.from({ length: detail?.jumlahAyat || 0 }, (_, i) => (
                <option key={i} value={i + 1}>
                  {' '}
                  Buka Ayat {i + 1}{' '}
                </option>
              ))}
            </select>
            <Link
              href={`../${params.nosurat}`}
              className="flex justify-between items-center py-[7px] px-[14px] bg-[#f4f6f8] text-[var(--primary)] rounded-[10px] w-[194px] cursor-pointer dark:bg-slate-800 h-[40px]"
              onClick={() => {
                window.scrollTo(0, 0)
                dispatch(
                  modalLoading(`proses membuka surat ${detail?.namaLatin}`)
                )
              }}>
              <p>Surat</p>
              <IconExternalLink className="w-[20px] h-[20px] stroke-[1.5]" />
            </Link>
          </div>
        </div>
      </div>
      <div className="flex gap-2 text-[var(--primary)] font-semibold items-center py-4 px-2 text-[14px]">
        <Link
          href="/"
          onClick={() => {
            window.scrollTo(0, 0)
            dispatch(modalLoading())
          }}>
          Daftar Surat
        </Link>
        <IconChevronRight className="h-4" />
        <Link
          href={`../${params.nosurat}`}
          onClick={() => {
            window.scrollTo(0, 0)
            dispatch(modalLoading(`proses membuka surat ${detail?.namaLatin}`))
          }}>
          Surat
        </Link>
        <IconChevronRight className="h-4" />
        <p>Tafsir</p>
      </div>
      <div className="h-max flex flex-col gap-4">
        {ayats?.map((res, i) => (
          <div
            key={res.ayat}
            className="bg-white/50 backdrop-blur-sm rounded-[10px] p-4 sm:p-5 flex flex-col gap-2 dark:bg-slate-700/50"
            ref={el => (ayatRefs.current[i] = el)}>
            <p className="font-bold text-[var(--primary)] text-[16px]">
              {detail?.nomor} : {res.ayat}
            </p>
            <p className="font-semibold text-[14px] font-Quicksand text-sm text-justify whitespace-pre-wrap my-2">
              {res.teks}
            </p>
            <div className="flex pt-[15px] px-[15px] mt-[15px] gap-[40px] flex-wrap border-t-[1.5px] border-t-[#f4f4f4] text-[#A5BCC6]">
              <IconHeart
                className="cursor-pointer sm:hover:text-[var(--primary)]"
                onClick={() => dispatch(modalSorry())}
              />
              <IconLink
                className="cursor-pointer hover:text-[var(--primary)]"
                onClick={() => handleCopyLink(res.ayat)}
              />
            </div>
          </div>
        ))}
      </div>
      <ScrollToTop />
    </div>
  )
}
