'use client'
import * as React from 'react';
import useSWR from 'swr';
import { IconSearch } from '@tabler/icons-react';
import Link from 'next/link';
import { ListSurat } from '@/interfaces';
import ScrollToTop from '@/components/ScrollToTop'
import { useDispatch } from 'react-redux'
import { modalLoading } from '@/redux/actions/modal'
import CardSuratSkeleton from '@/components/Skeleton/CardSuratSkeleton'

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
      <div className="relative bg-white w-full h-[50px] flex items-center px-[20px] rounded-lg">
        <IconSearch className="absolute text-[var(--primary)]" />
        <input
          value={search}
          onChange={e => setSearch(e.target.value)}
          type="search"
          placeholder="Cari surat"
          className="w-full h-full bg-transparent outline-none pl-10 placeholder-gray-300 font-semibold placeholder:font-normal"
        />
      </div>
      {!listSurat ? (
        <CardSuratSkeleton cards={20} />
      ) : (
        <div className="flex flex-wrap gap-[8px] sm:gap-[15px] justify-center sm:mt-5 mt-3">
          {searchResult.map(data => (
            <Link
              onClick={() => {
                window.scrollTo(0, 0)
                dispatch(modalLoading(data.namaLatin))
              }}
              href={`/${data.nomor}`}
              key={data.nomor}
              className="w-[160px] h-[60px] sm:w-[250px] sm:h-[84px] border border-white hover:border-[var(--primary)] hover:shadow-lg rounded-lg bg-white transition-all cursor-pointer px-[15px] sm:px-[27px] flex items-center gap-3 font-Quicksand">
              <span className="w-[20px] h-[20px] sm:w-[30px] sm:h-[30px] grid place-items-center bg-[var(--primary)] rounded-full text-white font-semibold self-start mt-4 sm:mt-6 text-[10px] sm:text-[14px]">
                {data.nomor}
              </span>
              <div className="flex-grow">
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
