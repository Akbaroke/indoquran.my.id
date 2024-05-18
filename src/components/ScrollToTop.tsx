import {
  IconArrowBigUpLinesFilled,
} from '@tabler/icons-react';
import { ActionIcon, Affix, Transition } from '@mantine/core';
import { useMediaQuery, useWindowScroll } from '@mantine/hooks';

export default function ScrollToTop() {
  const [scroll, scrollTo] = useWindowScroll();
  const isNotMobile = useMediaQuery('(min-width: 640px)');

  return (
    <Affix position={{ bottom: isNotMobile ? 15 : 60, right: 15 }}>
      <Transition transition="slide-up" mounted={scroll.y > 0}>
        {(transitionStyles) => (
          <ActionIcon
            style={transitionStyles}
            variant="filled"
            color="teal"
            size="lg"
            className="shadow-md hover:shadow-none transition-all duration-300 fixed bottom-5 right-4 z-50"
            radius="xl"
            onClick={() => scrollTo({ y: 0 })}
            aria-label="Scroll To Top">
            <IconArrowBigUpLinesFilled
              style={{ width: '70%', height: '70%' }}
              stroke={1.5}
            />
          </ActionIcon>
        )}
      </Transition>
    </Affix>
  );
}