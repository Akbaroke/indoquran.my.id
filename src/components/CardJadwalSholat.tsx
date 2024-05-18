import cn from '@/helpers/cn';
import getImageTime from '@/helpers/getImageTime';
import { Badge } from '@mantine/core';
import Image from 'next/image';

type Props = {
  label: string;
  time?: string;
  isActive?: boolean;
};

export default function CardJadwalSholat({ label, time, isActive }: Props) {
  return (
    <div
      className={cn(
        'max-w-[100px] rounded-lg overflow-hidden border shadow-sm transition-all duration-300',
        {
          'shadow-xl scale-110 border-teal-500': isActive,
        }
      )}>
      <Image
        src={getImageTime(label)}
        alt={label}
        className="w-full h-[80px] object-fill object-center"
      />
      <div className="flex flex-col gap-1 justify-center items-center p-2">
        <h1
          className={cn('font-medium capitalize', {
            'font-semibold': isActive,
          })}>
          {label}
        </h1>
        {time && (
          <Badge variant="outline" color="teal" size="lg">
            {time}
          </Badge>
        )}
      </div>
    </div>
  );
}
