import CardPenanda from '@/components/CardPenanda';
import InputSearch from '@/components/InputSearch';
import Metadata from '@/components/Metadata';
import { MetadataModel } from '@/models/metadataModel';
import { StoreModel } from '@/models/stateModel';
import { SegmentedControl, Text } from '@mantine/core';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useSelector } from 'react-redux';

type Props = {
  tab: string;
  metadata: MetadataModel;
};

export default function Penanda({ tab, metadata }: Props) {
  const router = useRouter();
  const [searchValue, setSearchValue] = useState('');
  const { ayat, doa, hadits } = useSelector(
    (state: StoreModel) => state.bookmark
  );

  const onChangeSelect = (e: string) => {
    router.push({
      query: { tab: e },
    });
  };

  const resultPenanda = (tab: string) => {
    switch (tab) {
      case 'hadits':
        return hadits
          ?.filter(
            (item) =>
              item.arti.toLowerCase().includes(searchValue.toLowerCase()) ||
              item.id.toLowerCase().includes(searchValue.toLowerCase())
          )
          ?.sort((a, b) => Number(b.time) - Number(a.time))
          ?.map((item, index) => (
            <CardPenanda
              key={index}
              arab={item.arab}
              arti={item.arti}
              time={item.time}
              id={item.id}
              link={item.link}
              nomor={index + 1}
              judul={`${item.id
                .split('_')[0]
                .split('-')
                .map(
                  (part) =>
                    part.charAt(0).toUpperCase() + part.slice(1).toLowerCase()
                )
                .join(' ')} : ${item.id.split('_')[1]}`}
              isBookmark={!!hadits?.find((e) => e.id === `${item.id}`)}
              type="hadits"
            />
          ));
      case 'doa':
        return doa
          ?.filter(
            (item) =>
              item.arti.toLowerCase().includes(searchValue.toLowerCase()) ||
              item.id.toLowerCase().includes(searchValue.toLowerCase())
          )
          ?.sort((a, b) => Number(b.time) - Number(a.time))
          ?.map((item, index) => (
            <CardPenanda
              key={index}
              arab={item.arab}
              arti={item.arti}
              time={item.time}
              id={item.id}
              judul={item.judul}
              link={item.link}
              nomor={index + 1}
              isBookmark={!!doa?.find((e) => e.id === `${item.id}`)}
              type="doa"
            />
          ));
      default:
        return ayat
          ?.filter(
            (item) =>
              item.latin.toLowerCase().includes(searchValue.toLowerCase()) ||
              item.arti.toLowerCase().includes(searchValue.toLowerCase()) ||
              item.id.toLowerCase().includes(searchValue.toLowerCase())
          )
          ?.sort((a, b) => Number(b.time) - Number(a.time))
          ?.map((item, index) => (
            <CardPenanda
              key={index}
              arab={item.arab}
              arti={item.arti}
              latin={item.latin}
              time={item.time}
              id={item.id}
              link={item.link}
              nomor={index + 1}
              judul={`${item.id.split('_')[0]} : ${item.id.split('_')[1]}`}
              isBookmark={!!ayat?.find((e) => e.id === `${item.id}`)}
              type="ayat"
            />
          ));
    }
  };

  return (
    <>
      <Metadata {...metadata} />
      <div className="flex justify-between items-center">
        <Text fw={700} fs="italic" size="xl">
          Daftar Penanda
        </Text>
        <InputSearch
          placeholder={`Cari ${tab} ...`}
          setSearchValue={setSearchValue}
          delayDebounce={0}
        />
      </div>
      <div className="flex flex-col gap-5 mt-10">
        <SegmentedControl
          color="teal"
          fullWidth
          radius="md"
          data={[
            {
              label: `Al-Quran (${ayat?.length ?? 0})`,
              value: 'quran',
            },
            {
              label: `Hadits (${hadits?.length ?? 0})`,
              value: 'hadits',
            },
            {
              label: `Doa (${doa?.length ?? 0})`,
              value: 'doa',
            },
          ]}
          value={tab}
          onChange={(e) => onChangeSelect(e as string)}
        />
        <div className="flex flex-col gap-5 mt-5">{resultPenanda(tab)}</div>
      </div>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { tab } = ctx.query;
  let metadata: MetadataModel = {};
  metadata.title = 'Daftar Penanda';

  switch (tab) {
    case 'doa':
      metadata.title += ' Doa';
      break;
    case 'hadits':
      metadata.title += ' Hadits';
      break;
    case 'quran':
      metadata.title += ' Quran';
      break;
  }

  return {
    props: {
      tab: tab ?? 'quran',
      metadata,
    },
  };
};
