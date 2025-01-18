import Nomer from "./Nomer";
import DropdownMenu from "./DropdownMenu";
import {
  IconBookmark,
  IconCopy,
  IconDots,
  IconLink,
  IconShare,
} from "@tabler/icons-react";
import { ActionIcon, rem } from "@mantine/core";
import { IconBookmarkFilled } from "@tabler/icons-react";
import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import {
  addBookmarkHadits,
  removeBookmarkHadits,
} from "@/redux/slices/bookmarkSlice";
import ModalShareMedia from "./ModalShareMedia";
import Notify from "./Notify";
import { useMediaQuery } from "@mantine/hooks";
import MenuDrawer from "./MenuDrawer";
import { useRouter } from "next/router";

type Props = {
  id: string;
  nomor: number;
  arab: string;
  arti: string;
  riwayat: string;
  isBookmark?: boolean;
  isLast?: boolean;
  onNextPage?: () => void;
};

const styleIcon = {
  width: rem(14),
  height: rem(14),
  color: "teal",
  opacity: 0.6,
};

export default function CardHadits({
  id,
  nomor,
  arab,
  arti,
  riwayat,
  isBookmark,
  isLast,
  onNextPage,
}: Props) {
  const dispatch = useDispatch();
  const { asPath } = useRouter();
  const cardRef = useRef<HTMLDivElement | null>(null);
  const [isBookmrk, setIsBookmrk] = useState(false);
  const [isOpenModalMediaShare, setIsOpenModalMediaShare] = useState(false);
  const [isOpenMenuDrawer, setIsOpenMenuDrawer] = useState(false);
  const isNotMobile = useMediaQuery("(min-width: 640px)");
  const link = `${process.env.NEXT_PUBLIC_BASE_URL}/${asPath}?nomor=${nomor}`;
  const content = `(HR. ${riwayat} No.${nomor}) :
${arab}

Artinya :
${arti}

Link Website :
${link}`;

  useEffect(() => {
    setIsBookmrk(!!isBookmark);
  }, [isBookmark]);

  useEffect(() => {
    if (!cardRef?.current) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (isLast && entry.isIntersecting) {
        onNextPage && onNextPage();
        observer.unobserve(entry.target);
      }
    });

    observer.observe(cardRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLast]);

  const handleBookmark = () => {
    if (isBookmrk) {
      dispatch(
        removeBookmarkHadits({
          id,
        })
      );
      Notify({
        type: "success",
        message: "Hapus Penanda Berhasil!",
      });
    } else {
      dispatch(
        addBookmarkHadits({
          id,
          arab,
          arti,
          link: `${asPath}?nomor=${nomor}`,
        })
      );
      Notify({
        type: "success",
        message: "Tambah Penanda Berhasil!",
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
      type: "success",
      message: "Copy Link Berhasil!",
    });
  };

  const handleCopyDoa = () => {
    navigator.clipboard.writeText(content);
    Notify({
      type: "success",
      message: "Copy Doa Berhasil!",
    });
  };

  const handleOpenMenu = () => {
    setIsOpenMenuDrawer(true);
  };

  const listMenu = [
    {
      title: "Copy Doa",
      icon: <IconCopy style={isNotMobile ? styleIcon : undefined} />,
      onClick: handleCopyDoa,
    },
    {
      title: "Copy Link",
      icon: <IconLink style={isNotMobile ? styleIcon : undefined} />,
      onClick: handleCopyLink,
    },
    {
      title: "Share Media",
      icon: <IconShare style={isNotMobile ? styleIcon : undefined} />,
      onClick: handleShareMedia,
    },
  ];

  const bookmarkMenu = {
    title: isBookmark ? "Unbookmark" : "Bookmark",
    icon: isBookmrk ? (
      <IconBookmarkFilled style={{ color: "yellow" }} />
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
            <Nomer number={nomor} />
            <div className="flex flex-col items-center gap-1">
              <ActionIcon
                variant="subtle"
                radius="xl"
                aria-label="bookmark"
                color="yellow"
                onClick={handleBookmark}
              >
                {isBookmrk ? (
                  <IconBookmarkFilled
                    style={{ width: "70%", height: "70%" }}
                    stroke={1.5}
                  />
                ) : (
                  <IconBookmark
                    style={{ width: "70%", height: "70%" }}
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
                <Nomer number={nomor} size="small" />
                <ActionIcon
                  variant="subtle"
                  radius="xl"
                  aria-label="menu"
                  onClick={handleOpenMenu}
                >
                  <IconDots
                    style={{ width: "70%", height: "70%" }}
                    stroke={1.5}
                  />
                </ActionIcon>
              </div>
            )}
            <p
              className="font-arab text-xl md:text-2xl font-semibold text-end"
              style={{
                lineHeight: 2.5,
              }}
            >
              {arab}
            </p>
          </div>
          <div className="flex flex-col gap-3">
            <p className="text-[14px] font-medium text-justify">{arti}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
