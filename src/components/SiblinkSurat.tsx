import cn from '@/helpers/cn';
import { Button } from '@mantine/core';
import { IconArrowNarrowLeft } from '@tabler/icons-react';
import { IconArrowNarrowRight } from '@tabler/icons-react';
import { useRouter } from 'next/router';

type Props = {
  nextSurat?: string;
  nextSuratHref?: string;
  prevSurat?: string;
  prevSuratHref?: string;
  className?: string;
};

export default function SiblinkSurat({
  nextSurat,
  nextSuratHref,
  prevSurat,
  prevSuratHref,
  className,
}: Props) {
  const { push } = useRouter();

  return (
    <div className={cn('flex gap-3', className)}>
      {prevSurat && (
        <Button
          onClick={() => (prevSuratHref ? push(prevSuratHref) : null)}
          variant="light"
          radius="md"
          fullWidth
          styles={{
            inner: {
              justifyContent: 'space-between',
            },
            root: {
              height: 'max-content',
              padding: 20,
            },
          }}
          leftSection={<IconArrowNarrowLeft size={20} />}>
          <div className="flex flex-col gap-2 text-end">
            <p>Sebelumnya</p>
            <p className="font-normal text-[14px]">Surat {prevSurat}</p>
          </div>
        </Button>
      )}
      {nextSurat && (
        <Button
          onClick={() => (nextSuratHref ? push(nextSuratHref) : null)}
          variant="light"
          radius="md"
          fullWidth
          styles={{
            inner: {
              justifyContent: 'space-between',
            },
            root: {
              height: 'max-content',
              padding: 20,
            },
          }}
          rightSection={<IconArrowNarrowRight size={20} />}>
          <div className="flex flex-col gap-2 text-start">
            <p>Selanjutnya</p>
            <p className="font-normal text-[14px]">Surat {nextSurat}</p>
          </div>
        </Button>
      )}
    </div>
  );
}
