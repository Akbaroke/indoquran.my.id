'use client'
import * as React from 'react'
import useSWR from 'swr'
import { Audio, ayatSurat, detailSurat } from '@/interfaces'
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
import { useDispatch } from 'react-redux'
import { unsetModal, modalSorry } from '@/redux/actions/modal'

async function fetchData(nosurat: string) {
  const res = await fetch(`${process.env.API_URL}${nosurat}`)
  const data = await res.json()
  return data.data
}

export default function Page({ params }: { params: { nosurat: string } }) {
  const { data, error } = useSWR(`/surat/${params.nosurat}`, fetchData)
  const [detail, setDetail] = React.useState<detailSurat | undefined>(undefined)
  const [ayats, setAyats] = React.useState<ayatSurat[]>([])
  const ayatRefs = React.useRef<(HTMLDivElement | null)[]>([])
  const audioRef = React.useRef<HTMLAudioElement>(null)
  const [bukaAyat, setBukaAyat] = React.useState<number>(0)
  const [pilihQori, setPilihQori] = React.useState<keyof Audio>('01')
  const [isPlaying, setIsPlaying] = React.useState<boolean>(false)
  const [audioPlay, setAudioPlay] = React.useState<string>('')
  const [listAudio, setListAudio] = React.useState<Audio[]>([])
  const [ayatPlay, setAyatPlay] = React.useState<number>(0)
  const audio = audioRef.current
  const dispatch = useDispatch()

  React.useEffect(() => {
    setDetail(data)
    setAyats(data?.ayat)
    if (data) {
      setTimeout(() => {
        const urlParams = new URLSearchParams(window.location.search)
        const ayat = urlParams.get('ayat')
        ayat && setBukaAyat(parseInt(ayat))
      }, 2000)
      setListAudio(data.ayat?.map((ayat: { audio: string }) => ayat.audio))
    }
  }, [data])

  React.useEffect(() => {
    scrollToAyat(bukaAyat)
  }, [bukaAyat])

  audio?.addEventListener('ended', () => {
    setIsPlaying(false)
    setAyatPlay(0)
  })

  React.useEffect(() => {
    if (isPlaying) {
      if (audio) {
        audio.src = audioPlay
        audio.play()
      }
    } else {
      audio?.pause()
    }
  }, [isPlaying, audio, audioPlay])

  React.useEffect(() => {
    function handleScroll() {
      if (window.scrollY < 100) {
        setBukaAyat(0)
      }
    }
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

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

  const handleChangeQori = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value: keyof Audio = event.target.value as keyof Audio
    setPilihQori(value)
  }

  const togglePlay = (nomerAyat: number) => {
    const index = nomerAyat - 1
    setAudioPlay(listAudio[index][pilihQori])
    setAyatPlay(nomerAyat)
    if (!isPlaying) {
      setIsPlaying(true)
    } else {
      setIsPlaying(false)
      setAyatPlay(0)
    }
  }

  const handleCopyLink = (ayat: number) => {
    const link = `${window.location.origin}/${params.nosurat}?ayat=${ayat}`
    navigator.clipboard.writeText(link)
    alert('Link copied successfully')
  }

  if (error) return <div>Failed to load data</div>
  if (!data) return <div>Loading...</div>
  if (ayats) {
    dispatch(unsetModal())
  }

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
            <select
              className="py-[7px] px-[14px] bg-[#f4f6f8] text-[var(--primary)] rounded-[10px] w-[194px] outline-none cursor-pointer"
              onChange={handleChangeQori}>
              <option value="01">Pilih Qori</option>
              <option value="01">Abdullah Al-Juhany</option>
              <option value="02">Abdul Muhsin Al-Qasim</option>
              <option value="03">Abdurrahman As-Sudais</option>
              <option value="04">Ibrahim Al-Dossari</option>
              <option value="05">Misyari Rasyid Al-Afasi</option>
            </select>
            <Link
              href={`${params.nosurat}/tafsir`}
              className="flex justify-between items-center py-[7px] px-[14px] bg-[#f4f6f8] text-[var(--primary)] rounded-[10px] w-[194px] cursor-pointer">
              <p>Tafsir</p>
              <IconExternalLink className="w-[20px] h-[20px] stroke-[1.5]" />
            </Link>
          </div>
        </div>
      </div>
      <div className="flex gap-2 text-[var(--primary)] font-semibold items-center py-4 px-2 text-[14px]">
        <Link href="/" onClick={() => window.scrollTo(0, 0)}>
          Daftar Surat
        </Link>
        <IconChevronRight className="h-4" />
        <p>Surat</p>
      </div>
      <div className="h-max flex flex-col gap-4">
        {ayats?.map((res, i) => (
          <div
            key={res.nomorAyat}
            className="bg-white rounded-[10px] p-4 sm:p-5 flex flex-col gap-2"
            ref={el => (ayatRefs.current[i] = el)}>
            <p className="font-bold text-[var(--primary)] text-[16px]">
              {detail?.nomor} : {res.nomorAyat}
            </p>
            <p
              className={`arab text-end text-[24px] my-2 ${
                ayatPlay === res.nomorAyat && 'text-[var(--primary)]'
              }`}>
              {res.teksArab}
            </p>
            <p className="font-semibold text-[14px] text-[var(--primary)] font-Quicksand">
              {res.teksLatin}
            </p>
            <p className="font-semibold text-[14px] font-Quicksand">
              {res.teksIndonesia}
            </p>
            <div className="flex pt-[15px] px-[15px] mt-[15px] gap-[40px] flex-wrap border-t-[1.5px] border-t-[#f4f4f4] text-[#A5BCC6]">
              <IconHeart
                className="cursor-pointer sm:hover:text-[var(--primary)]"
                onClick={() => dispatch(modalSorry())}
              />
              <IconBookmark
                className="cursor-pointer sm:hover:text-[var(--primary)]"
                onClick={() => dispatch(modalSorry())}
              />
              <IconLink
                className="cursor-pointer hover:text-[var(--primary)]"
                onClick={() => handleCopyLink(res.nomorAyat)}
              />
              <IconHeadphones
                className={`cursor-pointer sm:hover:text-[var(--primary)] ${
                  ayatPlay === res.nomorAyat && 'text-[var(--primary)]'
                }`}
                onClick={() => togglePlay(res.nomorAyat)}
              />
            </div>
          </div>
        ))}
      </div>
      <audio src={audioPlay} typeof="audio/mp3" ref={audioRef} />
      <ScrollToTop />
    </div>
  )
}