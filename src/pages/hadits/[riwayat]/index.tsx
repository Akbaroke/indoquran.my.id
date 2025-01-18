import CardHadits from "@/components/CardHadits";
import Metadata from "@/components/Metadata";
import ModalDetailHadits from "@/components/ModalDetailHadits";
import { HaditsDetailModel, ItemsHaditsType } from "@/models/haditsModel";
import { MetadataModel } from "@/models/metadataModel";
import { StoreModel } from "@/models/stateModel";
import { getHadits, getNomorHadits } from "@/services/haditsService";
import { Loader, rem, Select } from "@mantine/core";
import { useInViewport } from "@mantine/hooks";
import { IconBook2 } from "@tabler/icons-react";
import { GetServerSideProps } from "next";
import { useEffect, useState, useCallback } from "react";
import { useSelector } from "react-redux";

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
  const [totalPage, setTotalPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingData, setisLoadingData] = useState(false);
  const [isOpenModalDetailHadits, setIsOpenModalDetailHadits] = useState(false);
  const [listOptionNomorHadits, setListOptionNomorHadits] = useState<any[]>([]);

  const [dataDetailHadits, setDataDetailHadits] =
    useState<ItemsHaditsType | null>(detailHadits);

  useEffect(() => {
    getItems(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

  const onChangeDetailHadits = async (e: string) => {
    setisLoadingData(true);
    setIsOpenModalDetailHadits(true);
    const detailHadits = await getNomorHadits(riwayat as string, Number(e));
    setDataDetailHadits(detailHadits);
    setisLoadingData(false);
  };

  const getItems = async (page: number) => {
    setIsLoading(true);

    try {
      const res = await getHadits(riwayat, {
        page: page,
        limit: 5,
      });

      setTotalPage(res?.pagination.totalPages || 1);
      const newItems = res?.items;

      if (Array.isArray(newItems)) {
        setListHadits((prev) => {
          const existingIds = prev.map((list) => list.id);
          const filteredList = newItems.filter(
            (list) => !existingIds.includes(list.id)
          );
          return [...prev, ...filteredList];
        });
      } else {
        console.log("newItems is not an array:", newItems);
      }
    } catch (error) {
      console.error("Error fetching items:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleNextPage = () => {
    if (!isLoading && page < totalPage) {
      setPage((prevPage) => prevPage + 1);
      getItems(page + 1);
    }
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
              textTransform: "capitalize",
            },
            input: {
              textTransform: "capitalize",
            },
          }}
          comboboxProps={{
            transitionProps: { transition: "pop", duration: 200 },
            shadow: "md",
          }}
        />
      </div>
      <div className="flex flex-col gap-5 mt-5 pb-10">
        {listHadits.map((item, index, array) => (
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
            onNextPage={() => page < totalPage && handleNextPage()}
            isLast={array.length - 1 === index}
          />
        ))}
        {isLoading && (
          <div className="grid place-items-center mt-10">
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
  metadata.title = "Hadits";
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
      nomor: nomor ?? "",
    },
  };
};
