'use client'
import * as React from 'react';
import useSWR from 'swr';
import { IconSearch } from '@tabler/icons-react';
import Link from 'next/link';
import { ListSurat } from '@/interfaces';
import ScrollToTop from '@/components/ScrollToTop'


export default function Page() {
  const { data: listSurat, error } = useSWR<ListSurat[]>(
    `${process.env.API_URL}/surat`,
    async (url) => {
      const response = await fetch(url);
      const data = await response.json();
      return data.data;
    }
  );

  if (error) return <div>Failed to load</div>;
  if (!listSurat) return <div>Loading...</div>;

  return (
    <div className="max-w-[1100px] m-auto">
      <div className="relative bg-white w-full h-[50px] flex items-center px-[20px] rounded-lg">
        <IconSearch className="absolute text-[var(--primary)]" />
        <input
          type="search"
          placeholder="Cari surat"
          className="w-full h-full bg-transparent outline-none pl-10 placeholder-gray-300 font-Quicksand"
        />
      </div>
      <div className="flex flex-wrap gap-[15px] justify-center mt-5">
        {listSurat.map(data => (
          <Link
            href={`/${data.nomor}`}
            key={data.nomor}
            className="w-[250px] h-[84px] border border-white hover:border-[var(--primary)] hover:shadow-lg rounded-lg bg-white transition-all cursor-pointer px-[27px] flex items-center gap-3 font-Quicksand">
            <span className="w-[30px] h-[30px] grid place-items-center bg-[var(--primary)] rounded-full text-white font-semibold self-start mt-6">
              {data.nomor}
            </span>
            <div className="flex-grow">
              <h2 className="font-bold text-[16px] capitalize">
                {data.namaLatin}
              </h2>
              <h3 className="font-medium text-gray-400 text-[15px] capitalize">
                {data.arti.toLowerCase().replaceAll('yang', '')}
              </h3>
            </div>
          </Link>
        ))}
      </div>
      <ScrollToTop />
    </div>
  )
}
