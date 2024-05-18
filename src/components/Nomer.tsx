import cn from '@/helpers/cn';

type Props = {
  number: number | string;
  size?: 'small' | 'medium' | 'large';
  active?: boolean;
};

export default function Nomer({ number, size = 'medium', active }: Props) {
  let boxSize;
  let textSize;

  switch (size) {
    case 'small':
      boxSize = '35px';
      textSize = '10px';
      break;
    case 'large':
      boxSize = '45px';
      textSize = '14px';
      break;
    case 'medium':
    default:
      boxSize = '40px';
      textSize = '12px';
      break;
  }

  return (
    <div className="flex items-center justify-center relative w-max">
      <div
        className={`bg-cPrimary absolute ${
          active ? 'nomer-box-filled' : 'nomer-box-outline'
        }`}
        style={{ width: boxSize }}></div>
      <p
        className={cn('font-semibold relative z-10', {
          'text-white': active,
        })}
        style={{ fontSize: textSize }}>
        {number}
      </p>
    </div>
  );
}
