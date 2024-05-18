import { CloseButton, Input } from '@mantine/core';
import { useDebouncedValue } from '@mantine/hooks';
import { IconSearch } from '@tabler/icons-react';
import { useEffect, useState } from 'react';

type Props = {
  placeholder: string;
  setSearchValue: (value: string) => void;
  delayDebounce?: number;
};

export default function InputSearch({
  setSearchValue,
  placeholder,
  delayDebounce,
}: Props) {
  const [value, setValue] = useState('');
  const [debounced] = useDebouncedValue(value, delayDebounce ?? 200);

  useEffect(() => {
    setSearchValue(debounced);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debounced]);

  return (
    <Input
      radius="md"
      placeholder={placeholder}
      value={value}
      w={180}
      onChange={(event) => setValue(event.currentTarget.value)}
      leftSection={<IconSearch size={16} />}
      rightSectionPointerEvents="all"
      rightSection={
        <CloseButton
          aria-label="Clear input"
          size={18}
          onClick={() => setValue('')}
          style={{ display: value ? undefined : 'none' }}
        />
      }
    />
  );
}
