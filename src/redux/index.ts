import { configureStore } from '@reduxjs/toolkit';
import suratSlice from './slices/suratSlice';
import { AdzanSliceState, StoreModel } from '@/models/stateModel';
import bookmarkSlice, { setBookmarkAdzan } from './slices/bookmarkSlice';
import adzanSlice, { setPercentage, setStatusAdzan } from './slices/adzanSlice';
import calculatePercentage from '@/helpers/calculatePercentage';
import Notify from '@/components/Notify';

export const store = configureStore<StoreModel>({
  reducer: {
    surat: suratSlice,
    bookmark: bookmarkSlice,
    adzan: adzanSlice,
  },
});

// update percentage
let previousCountdownState: AdzanSliceState | null = null;

store.subscribe(() => {
  const { adzan } = store.getState();
  const { currentTime, nextAdzan, prevAdzan, location } = adzan;

  if (adzan !== previousCountdownState) {
    previousCountdownState = adzan;
    if (nextAdzan.time !== '') {
      const percent = calculatePercentage(
        currentTime,
        prevAdzan.time,
        nextAdzan.time
      );
      store.dispatch(
        setPercentage({
          percentage: percent,
        })
      );
    }

    if (currentTime !== '' && currentTime === nextAdzan.time) {
      Notify({
        id: `adzan-${nextAdzan.name}`,
        type: 'info',
        title: 'Pengingat Sholat',
        message: `Waktu Sholat ${nextAdzan.name} (${nextAdzan.time} - ${location})`,
        messageClassName: 'capitalize',
        duration: 10000,
      });
      store.dispatch(
        setStatusAdzan({
          status: 'adzan',
        })
      );
      if (!['imsak', 'dhuha'].includes(nextAdzan.name)) {
        store.dispatch(
          setBookmarkAdzan({
            isPlaying: true,
          })
        );
      }
    }
  }
});
