import Metadata from '@/components/Metadata';
import { Blockquote, Button, SimpleGrid } from '@mantine/core';
import { IconBook, IconBook2, IconClock, IconPray } from '@tabler/icons-react';
import { useRouter } from 'next/router';

export default function Home() {
  const { push } = useRouter();
  return (
    <div className="flex flex-col gap-5 my-8 text-xl italic font-semibold">
      <Metadata />
      <Blockquote
        color="teal"
        cite="Qs. Al-`Asr : 1-3"
        icon={<IconBook />}
        className="text-sm">
        Demi masa, sungguh, manusia berada dalam kerugian, kecuali orang-orang
        yang beriman dan mengerjakan kebajikan serta saling menasihati untuk
        kebenaran dan saling menasihati untuk kesabaran.
      </Blockquote>
      <SimpleGrid cols={{ base: 2 }} spacing={{ base: 10 }}>
        {navLinkData.map((item, index) => (
          <Button
            styles={{
              root: {
                height: 'max-content',
                padding: 20,
              },
            }}
            variant="light"
            color="teal"
            onClick={() => push(item.href)}
            key={index}>
            <div className="flex flex-col gap-2 justify-center items-center">
              {item.icon}
              <p className="text-md">{item.label}</p>
            </div>
          </Button>
        ))}
      </SimpleGrid>
    </div>
  );
}

interface LinkData {
  icon: React.ReactElement;
  label: string;
  href: string;
}

const navLinkData: LinkData[] = [
  {
    icon: <IconBook size={25} />,
    label: 'Quran',
    href: '/quran',
  },
  {
    icon: <IconBook2 size={25} />,
    label: 'Hadits',
    href: '/hadits',
  },
  {
    icon: <IconPray size={25} />,
    label: 'Doa',
    href: '/doa',
  },
  {
    icon: <IconClock size={25} />,
    label: 'Jadwal Sholat',
    href: '/jadwal-sholat',
  },
];