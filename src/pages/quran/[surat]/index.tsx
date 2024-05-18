import { BISMILLAH, MADINAH_ICON, MEKAH_ICON } from '@/assets';
import CardAyat from '@/components/CardAyat';
import Metadata from '@/components/Metadata';
import SiblinkSurat from '@/components/SiblinkSurat';
import { MetadataModel } from '@/models/metadataModel';
import { StoreModel } from '@/models/stateModel';
import SuratModel, { AudioIndexType, TafsirModel } from '@/models/suratModel';
import { setBookmarkQori } from '@/redux/slices/bookmarkSlice';
import { getSurat, getTafsir } from '@/services/suratService';
import { rem, Select } from '@mantine/core';
import { IconMicrophone2 } from '@tabler/icons-react';
import { IconBook } from '@tabler/icons-react';
import { GetServerSideProps } from 'next';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

type Props = {
  ayat: number;
  dataSurat: SuratModel;
  dataTafsir: TafsirModel;
  metadata: MetadataModel;
};

export default function Surat({
  dataSurat,
  dataTafsir,
  ayat,
  metadata,
}: Props) {
  const dispatch = useDispatch();
  const bookmark = useSelector((state: StoreModel) => state.bookmark);
  const ayatRefs = useRef<HTMLDivElement[]>([]);
  const [playAyat, setPlayAyat] = useState<number>(0);
  const suratWithOutBismillah: number[] = [1, 9];
  const audioRef = useRef<HTMLAudioElement>(null);
  const audio = audioRef.current;
  const [isLoadingPlayAyat, setIsLoadingPlayAyat] = useState<boolean>(false);

  audio?.addEventListener('ended', () => {
    nextPlayAyat(playAyat);
  });

  audio?.addEventListener('loadedmetadata', () => {
    setIsLoadingPlayAyat(false);
  });
  audio?.addEventListener('play', () => {
    setIsLoadingPlayAyat(true);
  });

  useEffect(() => {
    if (playAyat) {
      if (audio) {
        audio.src = dataSurat.ayat[playAyat - 1].audio[bookmark.qori];
        audio.play();
      }
    } else {
      audio?.pause();
    }
  }, [playAyat, audio, dataSurat.ayat, bookmark.qori]);

  useEffect(() => {
    if (ayat) {
      scrollToAyat(ayat);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ayat]);

  const scrollToAyat = (nomorAyat: number) => {
    try {
      const ayatRef = ayatRefs.current[nomorAyat - 1];
      window.scrollTo({
        top: ayatRef.offsetTop - 80,
        behavior: 'smooth',
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleTogleAudio = (isPlaying: boolean, nomorAyat: number) => {
    if (isPlaying) {
      setPlayAyat(nomorAyat);
    } else {
      setPlayAyat(0);
    }
  };

  const nextPlayAyat = (prevAyat: number) => {
    // console.log('prev :', prevAyat);
    if (prevAyat < dataSurat.jumlahAyat) {
      setPlayAyat(prevAyat + 1);
      scrollToAyat(prevAyat + 1);
      // console.log('next : ', prevAyat + 1);
    } else {
      setPlayAyat(0);
      // console.log('finish :', prevAyat);
    }
  };

  return (
    <>
      <audio
        src={dataSurat.ayat[0].audio[bookmark.qori]}
        typeof="audio/mp3"
        ref={audioRef}
      />
      <Metadata {...metadata} />
      <div className="flex flex-col items-center justify-center gap-3 py-5 border-b">
        <Image
          src={dataSurat.tempatTurun === 'Mekah' ? MEKAH_ICON : MADINAH_ICON}
          alt={dataSurat.tempatTurun}
          width={50}
        />
        <h1 className="font-bold text-xl">{dataSurat.namaLatin}</h1>
        <p className="font-medium text-gray-400 text-sm">
          {dataSurat.jumlahAyat} Ayat, {dataSurat.arti}
        </p>
        {!suratWithOutBismillah.includes(dataSurat.nomor) && (
          <Image src={BISMILLAH} alt="bismillah" width={200} />
        )}
        <div className="flex items-center gap-2 my-3">
          <Select
            placeholder="Buka Ayat"
            onChange={(e) => scrollToAyat(Number(e))}
            searchable
            data={Array.from({ length: dataSurat.jumlahAyat || 0 }, (_, i) => ({
              value: `${i + 1}`,
              label: `Buka Ayat ${i + 1}`,
            }))}
            className="font-semibold w-full sm:w-max"
            leftSection={
              <IconBook style={{ width: rem(16), height: rem(16) }} />
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
          <Select
            placeholder="Pilih Qori"
            onChange={(e) =>
              dispatch(setBookmarkQori({ qori: e as AudioIndexType }))
            }
            value={bookmark.qori}
            data={[
              {
                value: '01',
                label: 'Abdullah Al-Juhany',
              },
              {
                value: '02',
                label: 'Abdul Muhsin Al-Qasim',
              },
              {
                value: '03',
                label: 'Abdurrahman As-Sudais',
              },
              {
                value: '04',
                label: 'Ibrahim Al-Dossari',
              },
              {
                value: '05',
                label: 'Misyari Rasyid Al-Afasi',
              },
            ]}
            className="font-semibold w-full sm:w-max"
            leftSection={
              <IconMicrophone2 style={{ width: rem(16), height: rem(16) }} />
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
      </div>
      <div className="flex flex-col gap-5 my-5">
        {dataSurat?.ayat?.map((item, index) => (
          <CardAyat
            key={index}
            id={`${dataSurat.namaLatin}_${item.nomorAyat}`}
            isBookmark={
              !!bookmark.ayat?.find(
                (e) => e.id === `${dataSurat.namaLatin}_${item.nomorAyat}`
              )
            }
            namaSurat={dataSurat.namaLatin}
            nomorSurat={dataSurat.nomor}
            cardRef={(el) => (ayatRefs.current[index] = el)}
            isPlaying={playAyat === item.nomorAyat}
            toglePlaying={handleTogleAudio}
            isLoadingPlayAyat={isLoadingPlayAyat}
            tafsir={dataTafsir?.tafsir[index].teks}
            {...item}
          />
        ))}
      </div>
      <SiblinkSurat
        className="mt-5"
        nextSurat={dataSurat.suratSelanjutnya?.namaLatin}
        nextSuratHref={`/quran/${dataSurat.suratSelanjutnya?.nomor}`}
        prevSurat={dataSurat.suratSebelumnya?.namaLatin}
        prevSuratHref={`/quran/${dataSurat.suratSebelumnya?.nomor}`}
      />
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { surat, ayat } = ctx.query;
  let metadata: MetadataModel = {};

  const dataSurat = await getSurat(Number(surat));
  const dataTafsir = await getTafsir(Number(surat));

  metadata.title = dataSurat?.namaLatin;
  if (ayat) {
    try {
      metadata.metaDescription =
        dataSurat?.ayat[Number(ayat) - 1].teksIndonesia;
    } catch (error) {
      return {
        redirect: {
          destination: `/quran/${surat}`,
          permanent: false,
        },
      };
    }
  }

  return {
    props: {
      dataSurat,
      dataTafsir,
      ayat: ayat ?? '',
      metadata,
    },
  };
};
