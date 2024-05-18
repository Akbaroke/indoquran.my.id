import ADZAN_JIHARKAH from '@/assets/audio/adzan_jiharkah.mp3';
import ADZAN_KURDI from '@/assets/audio/adzan_kurdi.mp3';
import ADZAN_MEKKAH from '@/assets/audio/adzan_mekkah.mp3';

export default function getIramaAdzan(irama: string) {
  let adzan;
  switch (irama) {
    case 'jiharkah':
      adzan = ADZAN_JIHARKAH;
      break;
    case 'kurdi':
      adzan = ADZAN_KURDI;
      break;
    default:
      adzan = ADZAN_MEKKAH;
      break;
  }

  return adzan;
}
