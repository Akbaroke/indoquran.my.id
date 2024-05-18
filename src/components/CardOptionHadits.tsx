import { OptionHaditsModel } from '@/models/haditsModel';
import Nomer from './Nomer';
import { useHover } from '@mantine/hooks';
import addLeadingZero from '@/helpers/addLeadingZero';
import { IconArrowNarrowRight } from '@tabler/icons-react';
import Transition from './Transition';
import { useRouter } from 'next/router';

interface Props extends OptionHaditsModel {
  number: number;
}

export default function CardOptionHadits({ number, name, slug, total }: Props) {
  const { hovered, ref } = useHover();
  const { push } = useRouter();

  return (
    <div
      onClick={() => push(`/hadits/${slug}`)}
      className="flex items-center gap-7 border-b cursor-pointer p-2"
      ref={ref}>
      <Nomer number={addLeadingZero(number)} active={hovered} />
      <div className="flex justify-between items-center w-full">
        <div className="flex flex-col">
          <h1 className="font-semibold">{name}</h1>
          <p className="text-[14px] text-gray-400">{total} Riwayat</p>
        </div>
        <Transition opened={hovered} transition="slide-right">
          <IconArrowNarrowRight className="text-gray-300" />
        </Transition>
      </div>
    </div>
  );
}
