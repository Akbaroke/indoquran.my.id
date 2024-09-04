import { LOGO_INDOQURAN } from '@/assets';
import { restoreBookmark, setBookmarkAdzan } from '@/redux/slices/bookmarkSlice';
import {
  ActionIcon,
  AppShell,
  Container,
  Group,
  ScrollArea,
  Tooltip,
} from '@mantine/core';
import {
  IconBook2,
  IconPray,
  IconClock,
  IconBook,
} from '@tabler/icons-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ScrollToTop from './ScrollToTop';
import { setRealTime } from '@/redux/slices/adzanSlice';
import moment from 'moment';
import { Howl } from 'howler';
import { StoreModel } from '@/models/stateModel';
import getIramaAdzan from '@/helpers/getIramaAdzan';
import { IconBookmarks } from '@tabler/icons-react';

type Props = {
  children: React.ReactNode;
};

interface LinkData {
  icon: React.ReactElement;
  label: string;
  href: string;
}

export default function Appshell({ children }: Props) {
  const dispatch = useDispatch();
  const router = useRouter();
  const rootPath = router.pathname;
  const isAuth = false;
  const viewport = useRef<HTMLDivElement>(null);
  const { adzan } = useSelector((state: StoreModel) => state.bookmark);

  const isActivePage = (href: string) =>
    rootPath.split('/').includes(href.replace('/', ''));

  const adzanSoundRef = useRef<Howl | null>(null);

  if (!adzanSoundRef.current) {
    adzanSoundRef.current = new Howl({
      src: [getIramaAdzan(adzan?.irama ?? '')],
      volume: (adzan?.volume ?? 10) / 10,
      onend: () => {
        dispatch(
          setBookmarkAdzan({
            isPlaying: false,
          })
        );
      },
    });
  }

  useEffect(() => {
    if (adzan?.isPlaying) {
      adzanSoundRef.current?.play();
    } else {
      adzanSoundRef.current?.stop();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [adzan?.isPlaying]);

  useEffect(() => {
    adzanSoundRef.current?.volume((adzan?.volume ?? 10) / 10);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [adzan?.volume]);

  useEffect(() => {
    if (adzanSoundRef.current) {
      adzanSoundRef.current.unload();

      adzanSoundRef.current = new Howl({
        src: [getIramaAdzan(adzan?.irama ?? '')],
        volume: (adzan?.volume ?? 10) / 10,
        onend: () => {
          dispatch(
            setBookmarkAdzan({
              isPlaying: false,
            })
          );
        },
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [adzan?.irama]);

  useEffect(() => {
    dispatch(restoreBookmark());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    let oldTime: string;
    const interval = setInterval(() => {
      const newTime = moment().format('HH:mm');
      if (newTime !== oldTime) {
        oldTime = newTime;
        dispatch(
          setRealTime({
            currentTime: newTime,
          })
        );
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [dispatch]);

  return (
    <AppShell
      layout={rootPath === '/' ? 'default' : 'alt'}
      header={{ height: 60 }}
      navbar={{
        width: 80,
        breakpoint: rootPath === '/' ? 'xl' : 'sm',
        collapsed: { mobile: true },
      }}
      footer={{ height: 60 }}
      padding="md">
      <AppShell.Header>
        <Group h="100%" px="md">
          <Image
            src={LOGO_INDOQURAN}
            onClick={() => router.push('/')}
            alt="Indoquran"
            className={`w-9 h-9 cursor-pointer ${
              rootPath !== '/' && 'sm:hidden'
            }`}
          />
          <h1
            className="text-[18px] sm:text-[22px] font-bold italic text-cPrimary drop-shadow-md cursor-pointer"
            onClick={() => router.push('/')}>
            IndoQur`an
          </h1>
        </Group>
      </AppShell.Header>
      {rootPath !== '/' && (
        <AppShell.Navbar p="md">
          <AppShell.Section className="mb-5">
            <ActionIcon
              variant="subtle"
              size={50}
              radius="xl"
              onClick={() => router.push('/')}>
              <Image
                src={LOGO_INDOQURAN}
                alt="Indoquran"
                className="w-9 h-9 m-auto"
              />
            </ActionIcon>
          </AppShell.Section>
          <AppShell.Section grow my="md" component={ScrollArea}>
            <div className="flex flex-col gap-3 items-center">
              {navLinkData.map((item, index) => (
                <Tooltip
                  key={index}
                  arrowPosition="side"
                  arrowOffset={29}
                  transitionProps={{ duration: 300, transition: 'slide-left' }}
                  openDelay={500}
                  arrowSize={3}
                  label={item.label}
                  withArrow
                  position="right">
                  <Link href={item.href}>
                    <ActionIcon
                      color={isActivePage(item.href) ? 'teal' : 'dark'}
                      variant="transparent"
                      aria-label={item.label}
                      size="xl"
                      radius="md">
                      {item.icon}
                    </ActionIcon>
                  </Link>
                </Tooltip>
              ))}
            </div>
          </AppShell.Section>
          <AppShell.Section>
            <div className="flex flex-col gap-3 items-center">
              {footerLinkData.map((item, index) => (
                <Tooltip
                  key={index}
                  arrowPosition="side"
                  arrowOffset={29}
                  transitionProps={{ duration: 300, transition: 'slide-left' }}
                  openDelay={500}
                  arrowSize={3}
                  label={item.label}
                  withArrow
                  position="right">
                  <Link href={item.href}>
                    <ActionIcon
                      color={isActivePage(item.href) ? 'teal' : 'dark'}
                      variant="transparent"
                      aria-label={item.label}
                      size="xl"
                      radius="md">
                      {item.icon}
                    </ActionIcon>
                  </Link>
                </Tooltip>
              ))}
            </div>
          </AppShell.Section>
        </AppShell.Navbar>
      )}
      <AppShell.Main ref={viewport}>
        <ScrollToTop />
        <Container size="lg">{children}</Container>
      </AppShell.Main>
      <AppShell.Footer hiddenFrom="sm" hidden={rootPath === '/'}>
        <div className="flex gap-3 items-center justify-around p-2">
          {navLinkData.map((item, index) => (
            <Link
              href={item.href}
              key={index}
              className="flex flex-col items-center justify-center">
              <ActionIcon
                color={isActivePage(item.href) ? 'teal' : 'dark'}
                variant={isActivePage(item.href) ? 'light' : 'transparent'}
                aria-label={item.label}
                size="xl"
                radius="md">
                {item.icon}
              </ActionIcon>
            </Link>
          ))}
        </div>
      </AppShell.Footer>
    </AppShell>
  );
}

const navLinkData: LinkData[] = [
  {
    icon: <IconBook size={20} />,
    label: 'Quran',
    href: '/quran',
  },
  {
    icon: <IconBook2 size={20} />,
    label: 'Hadits',
    href: '/hadits',
  },
  {
    icon: <IconPray size={20} />,
    label: 'Doa',
    href: '/doa',
  },
  {
    icon: <IconClock size={20} />,
    label: 'Jadwal Sholat',
    href: '/jadwal-sholat',
  },
  {
    icon: <IconBookmarks size={20} />,
    label: 'Daftar Penanda',
    href: '/penanda',
  },
];

const footerLinkData: LinkData[] = [
  // {
  //   icon: <IconSettings size={18} />,
  //   label: 'Setting',
  //   href: '/setting',
  // },
  // {
  //   icon: isAuth ? <IconLogout size={18} /> : <IconUserCircle size={18} />,
  //   label: isAuth ? 'Logout' : 'Login',
  //   href: isAuth ? '/logout' : '/login',
  // },
];
