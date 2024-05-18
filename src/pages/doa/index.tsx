import CardDoa from '@/components/CardDoa';
import InputSearch from '@/components/InputSearch';
import Metadata from '@/components/Metadata';
import { DoadoaModel, DoaharianModel, DoatahlilModel } from '@/models/doaModel';
import { MetadataModel } from '@/models/metadataModel';
import { StoreModel } from '@/models/stateModel';
import { getDoaDoa, getDoaHarian, getDoaTahlil } from '@/services/doaService';
import { SegmentedControl, Text } from '@mantine/core';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';

const doaOption = [
  {
    value: 'doa-harian',
    label: 'Doa Harian',
  },
  {
    value: 'doa-doa',
    label: 'Doa-doa',
  },
  {
    value: 'doa-tahlil',
    label: 'Doa Tahlil',
  },
];

type Props = {
  tab: string;
  nomor: number;
  metadata: MetadataModel;
  listDoaHarian: DoaharianModel[];
  listDoaDoa: DoadoaModel[];
  listDoaTahlil: DoatahlilModel[];
};

export default function Doa({
  tab,
  nomor,
  metadata,
  listDoaHarian,
  listDoaDoa,
  listDoaTahlil,
}: Props) {
  const router = useRouter();
  const { doa } = useSelector((state: StoreModel) => state.bookmark);
  const doaRefs = useRef<HTMLDivElement[]>([]);
  const [searchValue, setSearchValue] = useState('');

  useEffect(() => {
    if (nomor) {
      scrollToDoa(nomor);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nomor]);

  const onChangeSelectDoa = (e: string) => {
    router.push({
      query: { tab: e },
    });
  };

  const scrollToDoa = (nomorDoa: number) => {
    try {
      const doaRef = doaRefs.current[nomorDoa - 1];
      window.scrollTo({
        top: doaRef.offsetTop - 80,
        behavior: 'smooth',
      });
    } catch (error) {
      if (tab) {
        router.push({
          query: { tab: tab },
        });
      }
    }
  };

  const resultDoa = (tab: string) => {
    switch (tab) {
      case 'doa-doa':
        return filterDoa({ search: searchValue, doadoa: listDoaDoa })?.map(
          (item: any, index) => (
            <CardDoa
              key={index}
              cardRef={(el) => (doaRefs.current[index] = el)}
              id={`doa-doa_${index + 1}`}
              nomer={index + 1}
              judul={item.judul}
              arab={item.arab}
              arti={item.indo}
              sumber={item.source}
              isBookmark={
                !!doa?.find((item) => item.id === `doa-doa_${index + 1}`)
              }
            />
          )
        );
      case 'doa-tahlil':
        return filterDoa({
          search: searchValue,
          doaTahlil: listDoaTahlil,
        })?.map((item: any, index) => (
          <CardDoa
            key={index}
            cardRef={(el) => (doaRefs.current[index] = el)}
            id={`doa-tahlil_${index + 1}`}
            nomer={index + 1}
            judul={item.title}
            arab={item.arabic}
            arti={item.translation}
            isBookmark={
              !!doa?.find((item) => item.id === `doa-tahlil_${index + 1}`)
            }
          />
        ));
      default:
        return filterDoa({
          search: searchValue,
          doaHarian: listDoaHarian,
        })?.map((item: any, index) => (
          <CardDoa
            key={index}
            cardRef={(el) => (doaRefs.current[index] = el)}
            id={`doa-harian_${index + 1}`}
            nomer={index + 1}
            judul={item.title}
            arab={item.arabic}
            arti={item.translation}
            latin={item.latin}
            isBookmark={
              !!doa?.find((item) => item.id === `doa-harian_${index + 1}`)
            }
          />
        ));
    }
  };

  function filterDoa({
    search,
    doadoa,
    doaHarian,
    doaTahlil,
  }: {
    search: string;
    doadoa?: DoadoaModel[];
    doaHarian?: DoaharianModel[];
    doaTahlil?: DoatahlilModel[];
  }) {
    switch (tab) {
      case 'doa-doa':
        return doadoa?.filter(
          (doa) =>
            doa.indo.toLowerCase().includes(search.toLowerCase()) ||
            doa.judul.toLowerCase().includes(search.toLowerCase()) ||
            doa.source.toLowerCase().includes(search.toLowerCase())
        );
      case 'doa-tahlil':
        return doaTahlil?.filter(
          (doa) =>
            doa.id.toString().toLowerCase().includes(search.toLowerCase()) ||
            doa.title.toLowerCase().includes(search.toLowerCase()) ||
            doa.translation.toLowerCase().includes(search.toLowerCase())
        );
      default:
        return doaHarian?.filter(
          (doa) =>
            doa.title.toLowerCase().includes(search.toLowerCase()) ||
            doa.latin.toLowerCase().includes(search.toLowerCase()) ||
            doa.translation.toLowerCase().includes(search.toLowerCase())
        );
    }
  }

  return (
    <>
      <Metadata {...metadata} />
      <div className="flex justify-between items-center">
        <Text fw={700} fs="italic" size="xl">
          Doa
        </Text>
        <InputSearch
          placeholder="Cari doa ..."
          setSearchValue={setSearchValue}
          delayDebounce={0}
        />
      </div>
      <div className='flex flex-col gap-5 mt-10'>
        <SegmentedControl
          color="teal"
          fullWidth
          radius="md"
          data={doaOption}
          value={tab}
          onChange={(e) => onChangeSelectDoa(e as string)}
        />
        <div className="flex flex-col gap-5 mt-5">{resultDoa(tab)}</div>
      </div>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { tab, nomor } = ctx.query;
  let metadata: MetadataModel = {}
  
  let listDoaHarian: DoaharianModel[] = [];
  let listDoaTahlil: DoatahlilModel[] = [];
  let listDoaDoa: DoadoaModel[] = [];

  switch (tab) {
    case 'doa-doa':
      listDoaDoa = await getDoaDoa();
      metadata.title = 'Doa Doa'
      break;
    case 'doa-tahlil':
      listDoaTahlil = await getDoaTahlil();
      metadata.title = 'Doa Tahlil'
      break;
    default:
      listDoaHarian = await getDoaHarian();
      metadata.title = 'Doa Harian'
      break;
  }
  

  if(nomor) {
    switch (tab) {
      case 'doa-doa':
        metadata.metaDescription = listDoaDoa[Number(nomor) - 1].judul;
        break;
      case 'doa-tahlil':
        metadata.metaDescription = listDoaTahlil[Number(nomor) - 1].title;
        break;
      default:
        metadata.metaDescription = listDoaHarian[Number(nomor) - 1].title;
        break;
    }
  }

  return {
    props: {
      tab: tab ?? 'doa-harian',
      nomor: nomor ?? '',
      metadata,
      listDoaHarian,
      listDoaDoa,
      listDoaTahlil,
    },
  };
};
