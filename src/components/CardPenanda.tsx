import Nomer from './Nomer';
import {
  IconBookmark,
} from '@tabler/icons-react';
import { ActionIcon, Badge } from '@mantine/core';
import { IconBookmarkFilled } from '@tabler/icons-react';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  addBookmarkAyat,
  addBookmarkDoa,
  addBookmarkHadits,
  removeBookmarkAyat,
  removeBookmarkDoa,
  removeBookmarkHadits,
} from '@/redux/slices/bookmarkSlice';
import Notify from './Notify';
import { useMediaQuery } from '@mantine/hooks';
import { useRouter } from 'next/router';
import { IconExternalLink } from '@tabler/icons-react';
import addLeadingZero from '@/helpers/addLeadingZero';
import moment from 'moment';

type Props = {
  id: string;
  judul: string;
  nomor: number;
  link: string;
  arab: string;
  latin?: string;
  arti: string;
  isBookmark?: boolean;
  type: 'doa' | 'hadits' | 'ayat';
  time?: Date;
};

export default function CardPenanda({
  id,
  judul,
  nomor,
  link,
  arab,
  latin,
  arti,
  isBookmark,
  type,
  time,
}: Props) {
  const dispatch = useDispatch();
  const { asPath, push } = useRouter();
  const [isBookmrk, setIsBookmrk] = useState(false);
  const isNotMobile = useMediaQuery('(min-width: 640px)');

  useEffect(() => {
    setIsBookmrk(!!isBookmark);
  }, [isBookmark]);

  const handleBookmark = () => {
    if (isBookmrk) {
      switch (type) {
        case 'hadits':
          dispatch(
            removeBookmarkHadits({
              id,
            })
          );
          break;
        case 'doa':
          dispatch(
            removeBookmarkDoa({
              id,
            })
          );
          break;
        case 'ayat':
        default:
          dispatch(
            removeBookmarkAyat({
              id,
            })
          );
          break;
      }
      Notify({
        type: 'success',
        message: 'Hapus Penanda Berhasil!',
      });
    } else {
      switch (type) {
        case 'hadits':
          dispatch(
            addBookmarkHadits({
              id,
              arab,
              arti,
              link: `${asPath}?nomor=${nomor}`,
            })
          );
          break;
        case 'doa':
          dispatch(
            addBookmarkDoa({
              id,
              arab,
              arti,
              judul,
              link,
            })
          );
          break;
        case 'ayat':
        default:
          dispatch(
            addBookmarkAyat({
              id,
              arab,
              arti,
              latin: latin ?? '',
              link,
            })
          );
          break;
      }
      Notify({
        type: 'success',
        message: 'Tambah Penanda Berhasil!',
      });
    }
    setIsBookmrk(!isBookmrk);
  };

  const trigerAction = () => (
    <>
      <ActionIcon
        variant="subtle"
        radius="xl"
        aria-label="link"
        onClick={() => push(link)}>
        <IconExternalLink
          style={{ width: '70%', height: '70%' }}
          stroke={1.5}
        />
      </ActionIcon>
      <ActionIcon
        variant="subtle"
        radius="xl"
        aria-label="bookmark"
        color="yellow"
        onClick={handleBookmark}>
        {isBookmrk ? (
          <IconBookmarkFilled
            style={{ width: '70%', height: '70%' }}
            stroke={1.5}
          />
        ) : (
          <IconBookmark style={{ width: '70%', height: '70%' }} stroke={1.5} />
        )}
      </ActionIcon>
    </>
  );

  return (
    <div data-aos="fade-up">
      <div className="flex gap-5 border-b p-2 py-4">
        {isNotMobile && (
          <div className="flex flex-col justify-between items-center gap-8">
            <Nomer number={addLeadingZero(nomor)} />
            <div className="flex flex-col items-center gap-1">
              {trigerAction()}
            </div>
          </div>
        )}
        <div className="flex flex-col gap-10 w-full">
          <div className="flex flex-col gap-5 w-full">
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center gap-7 w-full">
                {!isNotMobile && (
                  <Nomer number={addLeadingZero(nomor)} size="small" />
                )}
                <div className="flex items-center justify-between w-full">
                  <h1 className="font-semibold text-sm sm:text-md">{judul}</h1>
                  {isNotMobile && (
                    <Badge variant="outline" color="teal" size="md">
                      {moment(time).format('DD MMMM YYYY - HH:mm')}
                    </Badge>
                  )}
                </div>
              </div>
              {!isNotMobile && (
                <div className="flex items-center gap-2">{trigerAction()}</div>
              )}
            </div>
            <p
              className="font-arab text-xl md:text-2xl font-semibold text-end"
              style={{
                lineHeight: 2.5,
              }}>
              {arab}
            </p>
          </div>
          <div className="flex flex-col gap-3">
            <p className="text-[12px] italic text-cPrimary text-justify">
              {latin}
            </p>
            <p className="text-[14px] font-medium text-justify">{arti}</p>
            {!isNotMobile && (
              <Badge
                variant="outline"
                color="teal"
                size="sm"
                className="ml-auto">
                {moment(time).format('DD MMMM YYYY - HH:mm')}
              </Badge>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
