import { ActionIcon } from '@mantine/core';
import {
  IconPlayerPause,
  IconPlayerPlay,
  IconVolume,
  IconVolume2,
  IconVolume3,
} from '@tabler/icons-react';
import { useDispatch, useSelector } from 'react-redux';
import { StoreModel } from '@/models/stateModel';
import { setBookmarkAdzan } from '@/redux/slices/bookmarkSlice';

export default function ToggleMuteAdzan() {
  const dispatch = useDispatch();
  const { adzan } = useSelector((state: StoreModel) => state.bookmark);

  const togglePlay = () => {
    if (!adzan?.isPlaying) {
      dispatch(
        setBookmarkAdzan({
          isPlaying: true,
        })
      );
    } else {
      dispatch(
        setBookmarkAdzan({
          isPlaying: false,
        })
      );
    }
  };

  const toggleVolume = () => {
    let newVolume: number;

    switch (adzan.volume) {
      case 10:
        newVolume = 5;
        break;
      case 5:
        newVolume = 0;
        break;
      case 0:
      default:
        newVolume = 10;
        break;
    }

    dispatch(
      setBookmarkAdzan({
        volume: newVolume,
      })
    );
  };

  return (
    <div className="flex items-center gap-2">
      {adzan?.isPlaying && (
        <ActionIcon
          variant="light"
          color={adzan.volume === 0 ? 'red' : 'teal'}
          aria-label="Volume"
          onClick={toggleVolume}>
          {(adzan.volume ?? 10) === 10 && (
            <IconVolume style={{ width: '70%', height: '70%' }} stroke={1.5} />
          )}
          {(adzan.volume ?? 10) === 5 && (
            <IconVolume2 style={{ width: '70%', height: '70%' }} stroke={1.5} />
          )}
          {(adzan.volume ?? 10) === 0 && (
            <IconVolume3 style={{ width: '70%', height: '70%' }} stroke={1.5} />
          )}
        </ActionIcon>
      )}
      <ActionIcon
        variant="light"
        aria-label={adzan?.isPlaying ? 'Pause' : 'Play'}
        onClick={togglePlay}>
        {!adzan?.isPlaying ? (
          <IconPlayerPlay
            style={{ width: '70%', height: '70%' }}
            stroke={1.5}
          />
        ) : (
          <IconPlayerPause
            style={{ width: '70%', height: '70%' }}
            stroke={1.5}
          />
        )}
      </ActionIcon>
    </div>
  );
}
