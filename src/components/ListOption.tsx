import { SegmentedControl, VisuallyHidden, rem } from '@mantine/core';
import { IconMenu2, IconGridDots } from '@tabler/icons-react';

type Props = {
  value: string;
  setValue: (value: string) => void;
};

export default function ListOption({ value, setValue }: Props) {
  const iconProps = {
    style: { width: rem(18), height: rem(18), display: 'block' },
    stroke: 1.5,
  };

  return (
    <SegmentedControl
      visibleFrom="sm"
      radius="md"
      size="xs"
      value={value}
      onChange={setValue}
      data={[
        {
          value: 'grid',
          label: (
            <>
              <IconGridDots {...iconProps} />
              <VisuallyHidden>grid</VisuallyHidden>
            </>
          ),
        },
        {
          value: 'list',
          label: (
            <>
              <IconMenu2 {...iconProps} />
              <VisuallyHidden>list</VisuallyHidden>
            </>
          ),
        },
      ]}
    />
  );
}
