import CardSurat from '@/components/CardSurat';
import Metadata from '@/components/Metadata';
import ListOption from '@/components/ListOption';
import { MetadataModel } from '@/models/metadataModel';
import { StoreModel } from '@/models/stateModel';
import { fetchSurat } from '@/redux/slices/suratSlice';
import { Loader, SimpleGrid, Text } from '@mantine/core';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import InputSearch from '@/components/InputSearch';
import SuratModel from '@/models/suratModel';

export default function Quran({ metadata }: { metadata: MetadataModel }) {
  const dispatch = useDispatch<any>();
  const { status, data } = useSelector((state: StoreModel) => state.surat);
  const [listOption, setListOption] = useState('grid');
  const [searchValue, setSearchValue] = useState('');

  useEffect(() => {
    if (status === null) {
      dispatch(fetchSurat());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);

  function filterSurat(search: string, suratList: SuratModel[]) {
    const filteredList = suratList.filter(
      (surat) =>
        surat.nomor.toString().toLowerCase().includes(search.toLowerCase()) ||
        surat.namaLatin.toLowerCase().includes(search.toLowerCase()) ||
        surat.arti.toLowerCase().includes(search.toLowerCase())
    );
    return filteredList;
  }

  return (
    <>
      <Metadata {...metadata} />
      <div className="flex justify-between items-center">
        <Text fw={700} fs="italic" size="xl">
          Al-Qur`an
        </Text>
        <div className="flex items-center gap-3">
          <ListOption value={listOption} setValue={setListOption} />
          <InputSearch
            placeholder="Cari surat ..."
            setSearchValue={setSearchValue}
            delayDebounce={0}
          />
        </div>
      </div>
      {status === 'loading' ? (
        <div className="grid place-items-center mt-10">
          <Loader color="teal" size="sm" />
        </div>
      ) : (
        <SimpleGrid
          className="mt-5"
          cols={listOption === 'grid' ? { base: 1, sm: 2, md: 3 } : { base: 1 }}
          spacing={{ base: 10, sm: 30 }}>
          {filterSurat(searchValue, data).map((item, index) => (
            <CardSurat
              listOption={listOption}
              key={index}
              {...item}
              searchValue={searchValue}
            />
          ))}
        </SimpleGrid>
      )}
    </>
  );
}

export async function getServerSideProps() {
  let metadata: MetadataModel = {};
  metadata.title = 'Al-Quran';
  metadata.metaDescription =
    'Website ini menampilkan 114 Surat dalam Al-Quran dan Terjemahan Indonesia.';

  return {
    props: {
      metadata,
    },
  };
}
