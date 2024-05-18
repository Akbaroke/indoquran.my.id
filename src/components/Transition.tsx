import { MantineTransition, Transition as Tr } from '@mantine/core';
import React from 'react';

export default function Transition({
  opened,
  children,
  transition,
}: {
  opened: boolean;
  children: React.ReactNode;
  transition: MantineTransition;
}) {
  return (
    <Tr
      mounted={opened}
      transition={transition}
      duration={400}
      timingFunction="ease">
      {(styles) => <div style={styles}>{children}</div>}
    </Tr>
  );
}
