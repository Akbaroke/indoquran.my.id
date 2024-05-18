import { ActionIcon } from '@mantine/core';
import { IconPlayerPause, IconPlayerPlay } from '@tabler/icons-react';

type Props = {
  isPlaying: boolean;
  setIsPlaying: (isPlaying: boolean) => void;
  isLoading?: boolean;
};

export default function ButtonAudioPlay({
  isPlaying,
  setIsPlaying,
  isLoading,
}: Props) {
  const togglePlay = () => {
    if (!isPlaying) {
      setIsPlaying(true);
    } else {
      setIsPlaying(false);
    }
  };

  return (
    <div className="flex items-center gap-2">
      <ActionIcon
        variant="subtle"
        radius="xl"
        loading={isLoading}
        aria-label={isPlaying ? 'Pause' : 'Play'}
        onClick={togglePlay}>
        {!isPlaying ? (
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
