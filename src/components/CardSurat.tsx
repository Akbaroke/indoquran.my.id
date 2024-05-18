import cn from '@/helpers/cn';
import SuratModel from '@/models/suratModel';
import { useHover } from '@mantine/hooks';
import React from 'react';
import Nomer from './Nomer';
import Link from 'next/link';
import { Highlight } from '@mantine/core';

interface Props extends SuratModel {
  listOption: string;
  searchValue?: string;
}

export default function CardSurat({
  listOption,
  nomor,
  nama,
  namaLatin,
  jumlahAyat,
  tempatTurun,
  arti,
  deskripsi,
  audioFull,
  searchValue,
}: Props) {
  const { hovered, ref } = useHover();

  return (
    <div ref={ref} data-aos="fade-up">
      <Link
        href={`/quran/${nomor}`}
        className="flex gap-3 text-sm justify-between border-b w-full cursor-pointer p-2 transition-all duration-300">
        <div className="flex gap-7">
          <Nomer number={nomor} active={hovered} />
          <div className="flex flex-col gap-1">
            <Highlight
              color="teal"
              highlight={searchValue ?? ''}
              styles={{
                root: {
                  fontWeight: 600,
                },
              }}>
              {namaLatin}
            </Highlight>
            {searchValue ? (
              <Highlight
                color="teal"
                highlight={searchValue ?? ''}
                styles={{
                  root: {
                    fontSize: 12,
                    color: 'rgb(156 163 175 / var(--tw-text-opacity))',
                  },
                }}
                className={cn({
                  ' w-[120px] truncate': listOption === 'grid',
                })}>
                {arti}
              </Highlight>
            ) : (
              <p
                className={cn('text-[12px] text-gray-400', {
                  ' w-[120px] truncate': listOption === 'grid',
                })}>
                {arti}
              </p>
            )}
          </div>
        </div>
        <div className="text-end flex flex-col gap-1">
          <h1 className="font-semibold font-arab">{nama}</h1>
          <p className="text-[12px] text-gray-400">{jumlahAyat} Ayat</p>
        </div>
      </Link>
    </div>
  );
}

