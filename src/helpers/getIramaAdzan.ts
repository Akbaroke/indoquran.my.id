export default function getIramaAdzan(irama: string) {
  let adzan;
  switch (irama) {
    case 'jiharkah':
      adzan = '/audio/adzan_jiharkah.mp3';
      break;
    case 'kurdi':
      adzan = '/audio/adzan_kurdi.mp3';
      break;
    default:
      adzan = '/audio/adzan_mekkah.mp3';
      break;
  }

  return adzan;
}
