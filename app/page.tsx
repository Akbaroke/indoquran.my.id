'use client'
import * as React from 'react'
import useSWR from 'swr'
import { IconSearch } from '@tabler/icons-react'
import Link from 'next/link'
import { ListSurat } from '@/interfaces'
import ScrollToTop from '@/components/ScrollToTop'
import { useDispatch } from 'react-redux'
import { modalLoading, unsetModal } from '@/redux/actions/modal'
import CardSuratSkeleton from '@/components/Skeleton/CardSuratSkeleton'
import CardJadwalSholat from '@/components/CardJadwalSholat'

export default function Page() {
  const dispatch = useDispatch()
  const [search, setSearch] = React.useState<string>('')
  const [searchResult, setSearchResult] = React.useState<ListSurat[]>([])

  const { data: listSurat, error } = useSWR<ListSurat[]>(
    `${process.env.API_URL}/surat`,
    async url => {
      const response = await fetch(url)
      const data = await response.json()
      return data.data
    }
  )

  React.useEffect(() => {
    if (listSurat && search) {
      setSearchResult(filterSurat(search, listSurat))
    } else {
      setSearchResult(listSurat || [])
    }
  }, [listSurat, search])

  React.useEffect(() => {
    dispatch(unsetModal())
  }, [dispatch])

  function filterSurat(search: string, suratList: ListSurat[]) {
    const filteredList = suratList.filter(
      surat =>
        surat.nomor.toString().toLowerCase().includes(search.toLowerCase()) ||
        surat.namaLatin.toLowerCase().includes(search.toLowerCase()) ||
        surat.arti.toLowerCase().includes(search.toLowerCase())
    )
    return filteredList
  }

  if (error) return <div>Failed to load</div>

  return (
    <div className="max-w-[1100px] m-auto">
      <CardJadwalSholat />
      <div className="relative bg-white w-full h-[40px] sm:h-[50px] flex items-center px-[13px] sm:px-[20px] rounded-lg dark:bg-slate-700">
        <IconSearch className="absolute text-[var(--primary)] w-5 h-5 sm:w-6 sm:h-6" />
        <input
          value={search}
          onChange={e => setSearch(e.target.value)}
          type="search"
          placeholder="Cari surat"
          className="w-full h-full bg-transparent outline-none pl-8 sm:pl-10 placeholder-gray-300 font-semibold placeholder:font-normal placeholder:text-[14px] sm:placeholder:text-[18px]"
        />
      </div>
      {!listSurat ? (
        <CardSuratSkeleton cards={114} />
      ) : (
        <div className="flex flex-wrap gap-[8px] sm:gap-[15px] justify-center sm:mt-5 mt-3">
          {searchResult.map((data, index) => (
            <Link
              onClick={() => {
                window.scrollTo(0, 0)
                dispatch(modalLoading(`proses membuka surat ${data.namaLatin}`))
              }}
              href={`/${data.nomor}`}
              key={index}
              className="w-[145px] h-[60px] sm:w-[250px] sm:h-[84px] border border-white hover:border-[var(--primary)] hover:shadow-lg rounded-lg bg-white transition-all cursor-pointer px-[10px] sm:px-[27px] flex items-center gap-2 sm:gap-3 font-Quicksand dark:bg-slate-700 dark:border-none">
              <span className="w-[20px] h-[20px] sm:w-[30px] sm:h-[30px] grid place-items-center bg-[var(--primary)] rounded-full text-white font-semibold self-start mt-4 sm:mt-6 text-[10px] sm:text-[14px]">
                {data.nomor}
              </span>
              <div className="w-24 sm:w-auto">
                <h2 className="font-bold text-[13px] sm:text-[16px] capitalize">
                  {data.namaLatin}
                </h2>
                <h3 className="font-medium text-gray-400 text-[11px] sm:text-[15px] capitalize">
                  {data.arti.toLowerCase().replaceAll('yang', '')}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      )}
      <ScrollToTop />
    </div>
  )
}
