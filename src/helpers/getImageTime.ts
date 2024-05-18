import {
  IMAGE_ASHAR,
  IMAGE_DHUHA,
  IMAGE_DZUHUR,
  IMAGE_IMSAK,
  IMAGE_ISYA,
  IMAGE_MAGHRIB,
  IMAGE_PLACEHOLDER,
  IMAGE_SUBUH,
} from '@/assets';
import { StaticImageData } from 'next/image';

const getImageTime = (time: string): StaticImageData => {
  switch (time) {
    case 'imsak':
      return IMAGE_IMSAK;
    case 'subuh':
      return IMAGE_SUBUH;
    case 'dhuha':
      return IMAGE_DHUHA;
    case 'dzuhur':
      return IMAGE_DZUHUR;
    case 'ashar':
      return IMAGE_ASHAR;
    case 'maghrib':
      return IMAGE_MAGHRIB;
    case 'isya':
      return IMAGE_ISYA;
    default:
      return IMAGE_PLACEHOLDER;
  }
};

export default getImageTime;
