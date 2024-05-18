import Nomer from './Nomer';
import DropdownMenu from './DropdownMenu';
import {
  IconBookmark,
  IconCopy,
  IconDots,
  IconLink,
  IconShare,
} from '@tabler/icons-react';
import { ActionIcon, Badge, rem } from '@mantine/core';
import { IconBookmarkFilled } from '@tabler/icons-react';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  addBookmarkDoa,
  removeBookmarkDoa,
} from '@/redux/slices/bookmarkSlice';
import ModalShareMedia from './ModalShareMedia';
import Notify from './Notify';
import { useMediaQuery } from '@mantine/hooks';
import MenuDrawer from './MenuDrawer';

type Props = {
  id: string;
  nomer: number;
  judul: string;
  arab: string;
  arti: string;
  latin?: string;
  sumber?: string;
  isBookmark?: boolean;
  cardRef?: (el: HTMLDivElement) => void;
};

const styleIcon = {
  width: rem(14),
  height: rem(14),
  color: 'teal',
  opacity: 0.6,
};

export default function CardDoa({
  id,
  nomer,
  judul,
  arab,
  arti,
  latin,
  sumber,
  isBookmark,
  cardRef,
}: Props) {
  const dispatch = useDispatch();
  const [isBookmrk, setIsBookmrk] = useState(false);
  const [isOpenModalMediaShare, setIsOpenModalMediaShare] = useState(false);
  const [isOpenMenuDrawer, setIsOpenMenuDrawer] = useState(false);
  const isNotMobile = useMediaQuery('(min-width: 640px)');
  const link = `${process.env.NEXT_PUBLIC_BASE_URL}/doa?tab=${
    getUnikDoa(id).doaType
  }&nomor=${getUnikDoa(id).doaId}`;
  const content = `${judul} :
${arab}

Artinya :
${arti}

Link Website :
${link}`;

  function getUnikDoa(id: string) {
    const splitId = id.split('_');
    const doaType = splitId[0];
    const doaId = splitId[1];
    return { doaType, doaId };
  }

  useEffect(() => {
    setIsBookmrk(!!isBookmark);
  }, [isBookmark]);

  const handleBookmark = () => {
    if (isBookmrk) {
      dispatch(
        removeBookmarkDoa({
          id,
        })
      );
      Notify({
        type: 'success',
        message: 'Hapus Penanda Berhasil!',
      });
    } else {
      dispatch(
        addBookmarkDoa({
          id,
          arab,
          arti,
          judul,
          link: `/doa?tab=${getUnikDoa(id).doaType}&nomor=${
            getUnikDoa(id).doaId
          }`,
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

  const handleCopyDoa = () => {
    navigator.clipboard.writeText(content);
    Notify({
      type: 'success',
      message: 'Copy Doa Berhasil!',
    });
  };

  const handleOpenMenu = () => {
    setIsOpenMenuDrawer(true);
  };

  const listMenu = [
    {
      title: 'Copy Doa',
      icon: <IconCopy style={isNotMobile ? styleIcon : undefined} />,
      onClick: handleCopyDoa,
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

  return (
    <div ref={cardRef} data-aos="fade-up">
      <ModalShareMedia
        isOpen={isOpenModalMediaShare}
        onClose={() => setIsOpenModalMediaShare(false)}
        content={content}
        url={link}
      />
      <MenuDrawer
        isOpen={isOpenMenuDrawer}
        onClose={() => setIsOpenMenuDrawer(false)}
        listMenu={[bookmarkMenu, ...listMenu]}
      />
      <div className="flex gap-5 border-b p-2 py-4">
        {isNotMobile && (
          <div className="flex flex-col justify-between items-center">
            <Nomer number={nomer} />
            <div className="flex flex-col items-center gap-1">
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
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center gap-7">
                {!isNotMobile && <Nomer number={nomer} size="small" />}
                <h1 className="font-semibold text-sm sm:text-md">{judul}</h1>
              </div>
              {!isNotMobile && (
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
            {sumber && (
              <Badge variant="light" color="teal" className="mb-2 ml-auto">
                {sumber}
              </Badge>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
