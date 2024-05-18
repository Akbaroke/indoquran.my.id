import CardHadits from '@/components/CardHadits';
import Metadata from '@/components/Metadata';
import ModalDetailHadits from '@/components/ModalDetailHadits';
import { HaditsDetailModel, ItemsHaditsType } from '@/models/haditsModel';
import { MetadataModel } from '@/models/metadataModel';
import { StoreModel } from '@/models/stateModel';
import { getHadits, getNomorHadits } from '@/services/haditsService';
import { Loader, rem, Select } from '@mantine/core';
import { useInViewport } from '@mantine/hooks';
import { IconBook2 } from '@tabler/icons-react';
import { GetServerSideProps } from 'next';
import { useEffect, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';

type Props = {
  riwayat: string;
  dataRiwayat: HaditsDetailModel;
  metadata: MetadataModel;
  detailHadits: ItemsHaditsType | null;
  nomor: string;
};

export default function Riwayat({
  riwayat,
  dataRiwayat,
  metadata,
  detailHadits,
  nomor,
}: Props) {
  const { hadits } = useSelector((state: StoreModel) => state.bookmark);
  const [listHadits, setListHadits] = useState<ItemsHaditsType[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [isLoadingData, setisLoadingData] = useState(false);
  const [isOpenModalDetailHadits, setIsOpenModalDetailHadits] = useState(false);
  const { ref, inViewport } = useInViewport();
  const [listOptionNomorHadits, setListOptionNomorHadits] = useState<any[]>([]);

  const [dataDetailHadits, setDataDetailHadits] =
    useState<ItemsHaditsType | null>(detailHadits);

  useEffect(() => {
    setIsOpenModalDetailHadits(true);

    const generateData = () => {
      const newData = [];
      for (let i = 1; i <= dataRiwayat.total; i++) {
        newData.push({
          value: String(i),
          label: `Buka Nomer ${i}`,
        });
      }
      setListOptionNomorHadits(newData);
    };

    generateData();
  }, [dataRiwayat.total, detailHadits]);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const newData = await getHadits(riwayat, page);
      if (newData?.items) {
        const filteredNewData = newData.items.filter((newItem) => {
          return !listHadits.some(
            (existingItem) => existingItem.number === newItem.number
          );
        });
        setListHadits((prevData) => [...prevData, ...filteredNewData]);
        setPage((prevPage) => prevPage + 1);
      }
    } finally {
      setLoading(false);
    }
  }, [listHadits, page, riwayat]);

  useEffect(() => {
    if (dataRiwayat) {
      setListHadits(dataRiwayat.items);
      setLoading(false);
    }
  }, [dataRiwayat]);

  useEffect(() => {
    if (inViewport && !loading) {
      fetchData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inViewport]);

  const onChangeDetailHadits = async (e: string) => {
    setisLoadingData(true);
    setIsOpenModalDetailHadits(true);
    const detailHadits = await getNomorHadits(riwayat as string, Number(e));
    setDataDetailHadits(detailHadits);
    setisLoadingData(false);
  };

  return (
    <>
      <Metadata {...metadata} />
      {dataDetailHadits && (
        <ModalDetailHadits
          id={`${dataRiwayat.slug}_${dataDetailHadits.number}`}
          isLoading={isLoadingData}
          nomor={dataDetailHadits.number}
          arab={dataDetailHadits.arab}
          arti={dataDetailHadits.id}
          riwayat={dataRiwayat.name}
          isBookmark={
            !!hadits?.find(
              (item) =>
                item.id === `${dataRiwayat.slug}_${dataDetailHadits.number}`
            )
          }
          isOpen={isOpenModalDetailHadits}
          onClose={() => setIsOpenModalDetailHadits(false)}
        />
      )}
      <div className="flex flex-col items-center justify-center gap-3 py-5 border-b">
        <h1 className="font-bold text-xl">{dataRiwayat.name}</h1>
        <p className="font-medium text-gray-400 text-sm">
          {dataRiwayat.total} Riwayat
        </p>
        <Select
          placeholder="Buka Nomer Hadits"
          onChange={(e) => onChangeDetailHadits(e as string)}
          value={nomor}
          searchable
          data={listOptionNomorHadits}
          allowDeselect={false}
          className="font-semibold w-full sm:w-max"
          leftSection={
            <IconBook2 style={{ width: rem(16), height: rem(16) }} />
          }
          size="xs"
          styles={{
            dropdown: {
              textTransform: 'capitalize',
            },
            input: {
              textTransform: 'capitalize',
            },
          }}
          comboboxProps={{
            transitionProps: { transition: 'pop', duration: 200 },
            shadow: 'md',
          }}
        />
      </div>
      <div className="flex flex-col gap-5 mt-5 pb-10">
        {listHadits.map((item, index) => (
          <CardHadits
            key={index}
            id={`${dataRiwayat.slug}_${item.number}`}
            nomor={item.number}
            arab={item.arab}
            arti={item.id}
            riwayat={dataRiwayat.name}
            isBookmark={
              !!hadits?.find(
                (e) => e.id === `${dataRiwayat.slug}_${item.number}`
              )
            }
          />
        ))}
        {page < dataRiwayat.pagination.totalPages && (
          <div className="grid place-items-center mt-10" ref={ref}>
            <Loader color="teal" size="sm" />
          </div>
        )}
      </div>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { riwayat, nomor } = ctx.query;
  let metadata: MetadataModel = {};
  metadata.title = 'Hadits';
  let detailHadits: ItemsHaditsType | null = null;

  const dataRiwayat = await getHadits(riwayat as string);

  if (nomor) {
    try {
      detailHadits = await getNomorHadits(riwayat as string, Number(nomor));
      metadata.metaDescription = detailHadits?.id;
    } catch (error) {
      return {
        redirect: {
          destination: `/hadits/${riwayat}`,
          permanent: false,
        },
      };
    }
  }

  return {
    props: {
      metadata,
      riwayat,
      dataRiwayat,
      detailHadits,
      nomor: nomor ?? '',
    },
  };
};
