'use client'
import { ayatSurat, detailSurat } from '@/interfaces';
import { IconChevronRight } from '@tabler/icons-react';
import Link from 'next/link';
import * as React from 'react';
import useSWR from 'swr';

async function fetchData(slug: string) {
  const res = await fetch(`${process.env.API_URL}/surat/${slug}`);
  const data = await res.json();
  return data.data;
}

export default function Page({ params }: { params: { slug: string } }) {
  const [detail, setDetail] = React.useState<detailSurat | undefined>(undefined)
  const [ayat, setAyat] = React.useState<ayatSurat[]>([])
  const { data, error } = useSWR(params.slug, fetchData)
  const containerRef = React.useRef<HTMLDivElement>(null);
  React.useEffect(() => {
    setDetail(data)
    setAyat(data?.ayat)
  }, [data])


  if (error) return <div>Failed to load data</div>;
  if (!data) return <div>Loading...</div>;

  return (
    <div className='max-w-[1107px] m-auto'>
      <div className='bg-white  p-[22px] rounded-[10px] text-center'>
        <div>
          <p className='text-[24px]'>{detail?.nama}</p>
          <p className='text-[24px] font-semibold'>{detail?.namaLatin}</p>
          <p className='text-[16px] font-semibold text-[#a5bcc6]'>{detail?.tempatTurun} • {detail?.arti} • {detail?.jumlahAyat} Ayat</p>
        </div>
      </div>
      <div className='flex gap-2 text-[var(--primary)] font-semibold items-center py-2'>
        <Link href='/'>Daftar Surat</Link>
        <IconChevronRight className='h-4' />
        <p>Baca Ayat</p>
      </div>
      <div ref={containerRef} className='h-max flex flex-col gap-4'>
          {ayat?.map(res => (
            <div key={res.nomorAyat} className='bg-white rounded-[10px] p-4 flex flex-col gap-2'>
              <p className='font-bold text-[var(--primary)] text-[16px]'>{detail?.nomor} : {res.nomorAyat}</p>
              <p className='text-end'>{res.teksArab}</p>
              <p className='font-semibold text-[14px] text-[var(--primary)] font-Quicksand'>{res.teksLatin}</p>
              <p className='font-semibold text-[14px] font-Quicksand'>{res.teksIndonesia}</p>
            </div>
          ))}
      </div>
    </div>
  );
}
