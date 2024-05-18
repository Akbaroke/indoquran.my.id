import { useEffect, useState } from 'react';
import Nomer from './Nomer';
import { ActionIcon, rem } from '@mantine/core';
import {
  IconBookmarkFilled,
  IconBookmark,
  IconLink,
  IconShare,
  IconCopy,
} from '@tabler/icons-react';
import DropdownMenu from './DropdownMenu';
import { useDispatch } from 'react-redux';
import { AyatModel } from '@/models/suratModel';
import { useRouter } from 'next/router';
import { useMediaQuery } from '@mantine/hooks';
import Notify from './Notify';
import {
  addBookmarkAyat,
  removeBookmarkAyat,
} from '@/redux/slices/bookmarkSlice';
import ModalShareMedia from './ModalShareMedia';
import MenuDrawer from './MenuDrawer';
import { IconDots } from '@tabler/icons-react';
import ButtonAudioPlay from './ButtonAudioPlay';
import cn from '@/helpers/cn';
import ModalTafsir from './ModalTafsir';

interface Props extends AyatModel {
  id: string;
  namaSurat: string;
  nomorSurat: number;
  isBookmark: boolean;
  cardRef?: (el: HTMLDivElement) => void;
  isPlaying: boolean;
  toglePlaying: (isPlaying: boolean, nomorAyat: number) => void;
  isLoadingPlayAyat: boolean;
  tafsir: string
}

const styleIcon = {
  width: rem(14),
  height: rem(14),
  color: 'teal',
  opacity: 0.6,
};

export default function CardAyat({
  nomorAyat,
  teksArab,
  teksLatin,
  teksIndonesia,
  audio,
  id,
  namaSurat,
  nomorSurat,
  isBookmark,
  cardRef,
  isPlaying,
  toglePlaying,
  isLoadingPlayAyat,
  tafsir
}: Props) {
  const dispatch = useDispatch();
  const { asPath } = useRouter();
  const [isBookmrk, setIsBookmrk] = useState<boolean>(false);
  const [isOpenModalMediaShare, setIsOpenModalMediaShare] = useState(false);
  const [isOpenMenuDrawer, setIsOpenMenuDrawer] = useState(false);
  const isNotMobile = useMediaQuery('(min-width: 640px)');
  const link = `${process.env.NEXT_PUBLIC_BASE_URL}/quran/${nomorSurat}?ayat=${nomorAyat}`;
  const content = `(QS. ${namaSurat} : ${nomorAyat}) :
${teksArab}

Artinya :
${teksIndonesia}

Link Website :
${link}`;

  useEffect(() => {
    setIsBookmrk(!!isBookmark);
  }, [isBookmark]);

  const handleBookmark = () => {
    if (isBookmrk) {
      dispatch(
        removeBookmarkAyat({
          id,
        })
      );
      Notify({
        type: 'success',
        message: 'Hapus Penanda Berhasil!',
      });
    } else {
      dispatch(
        addBookmarkAyat({
          id,
          arab: teksArab,
          arti: teksIndonesia,
          latin: teksLatin,
          link: `${asPath}?ayat=${nomorAyat}`
        })
      );
      Notify({
        type: 'success',
        message: 'Tambah Penanda Berhasil!',
      });
    }
    setIsBookmrk(!isBookmrk);
  };

  const handleShareMedia = () => {
    setIsOpenModalMediaShare(true);
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(link);
    Notify({
      type: 'success',
      message: 'Copy Link Berhasil!',
    });
  };

  const handleCopyAyat = () => {
    navigator.clipboard.writeText(content);
    Notify({
      type: 'success',
      message: 'Copy Ayat Berhasil!',
    });
  };

  const handleOpenMenu = () => {
    setIsOpenMenuDrawer(true);
  };

  const listMenu = [
    {
      title: 'Copy Ayat',
      icon: <IconCopy style={isNotMobile ? styleIcon : undefined} />,
      onClick: handleCopyAyat,
    },
    {
      title: 'Copy Link',
      icon: <IconLink style={isNotMobile ? styleIcon : undefined} />,
      onClick: handleCopyLink,
    },
    {
      title: 'Share Media',
      icon: <IconShare style={isNotMobile ? styleIcon : undefined} />,
      onClick: handleShareMedia,
    },
  ];

  const bookmarkMenu = {
    title: isBookmark ? 'Unbookmark' : 'Bookmark',
    icon: isBookmrk ? (
      <IconBookmarkFilled style={{ color: 'yellow' }} />
    ) : (
      <IconBookmark />
    ),
    onClick: handleBookmark,
  };

  const handleTogle = (isPlaying: boolean) => {
    toglePlaying(isPlaying, nomorAyat);
  };

  return (
    <div ref={cardRef}>
      <ModalShareMedia
        isOpen={isOpenModalMediaShare}
        onClose={() => setIsOpenModalMediaShare(false)}
        content={content}
        url={link}
        withPicture={{
          arab: teksArab,
          arti: teksIndonesia,
          sumber: `(QS. ${namaSurat} : ${nomorAyat})`,
        }}
      />
      <MenuDrawer
        isOpen={isOpenMenuDrawer}
        onClose={() => setIsOpenMenuDrawer(false)}
        listMenu={[bookmarkMenu, ...listMenu]}
      />
      <div
        className={cn(
          'flex gap-5 border-b p-2 py-4 transition-all duration-300',
          {
            'border-cPrimary/30': isPlaying,
          }
        )}>
        {isNotMobile && (
          <div className="flex flex-col justify-between items-center gap-8">
            <Nomer number={nomorAyat} active={isPlaying} />
            <div className="flex flex-col items-center gap-1">
              <ModalTafsir
                nomorAyat={nomorAyat}
                namaSurat={namaSurat}
                tafsir={tafsir}
              />
              <ButtonAudioPlay
                isPlaying={isPlaying}
                setIsPlaying={handleTogle}
                isLoading={isLoadingPlayAyat && isPlaying}
              />
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
                  <IconBookmark
                    style={{ width: '70%', height: '70%' }}
                    stroke={1.5}
                  />
                )}
              </ActionIcon>
              <DropdownMenu position="bottom-start" listMenu={listMenu} />
            </div>
          </div>
        )}
        <div className="flex flex-col gap-10 w-full">
          <div className="flex flex-col gap-5 w-full">
            {!isNotMobile && (
              <div className="flex items-center justify-between w-full">
                <Nomer number={nomorAyat} size="small" active={isPlaying} />
                <div className="flex items-center gap-2">
                  <ModalTafsir
                    nomorAyat={nomorAyat}
                    namaSurat={namaSurat}
                    tafsir={tafsir}
                  />
                  <ButtonAudioPlay
                    isPlaying={isPlaying}
                    setIsPlaying={handleTogle}
                    isLoading={isLoadingPlayAyat && isPlaying}
                  />
                  <ActionIcon
                    variant="subtle"
                    radius="xl"
                    aria-label="menu"
                    onClick={handleOpenMenu}>
                    <IconDots
                      style={{ width: '70%', height: '70%' }}
                      stroke={1.5}
                    />
                  </ActionIcon>
                </div>
              </div>
            )}
            <p
              className={cn(
                'font-arab text-xl md:text-2xl font-semibold text-end transition-all duration-300',
                {
                  'drop-shadow-2xl text-cPrimary': isPlaying,
                }
              )}
              style={{
                lineHeight: 2.5,
              }}>
              {teksArab}
            </p>
          </div>
          <div className="flex flex-col gap-3">
            <p
              className={cn(
                'text-[12px] italic text-cPrimary text-justify transition-all duration-300',
                {
                  'font-bold': isPlaying,
                }
              )}>
              {teksLatin}
            </p>
            <p className="text-[14px] font-medium text-justify">
              {teksIndonesia}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

            