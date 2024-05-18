import { ActionIcon, Modal } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconNotes } from '@tabler/icons-react';

type Props = {
  nomorAyat: number;
  namaSurat: string;
  tafsir: string;
};

export default function ModalTafsir({ nomorAyat, namaSurat, tafsir }: Props) {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <Modal
        opened={opened}
        onClose={close}
        title={`Tafsir QS. ${namaSurat} : ${nomorAyat}`}
        styles={{
          title: {
            fontWeight: 600,
          },
        }}
        centered
        size="xl"
        radius="lg"
        transitionProps={{
          transition: 'pop',
          duration: 100,
        }}
        overlayProps={{
          backgroundOpacity: 0.2,
          blur: 1,
        }}>
        <div className="p-4">
          <p className="text-justify whitespace-pre-wrap text-sm">{tafsir}</p>
        </div>
      </Modal>

      <ActionIcon
        variant="subtle"
        radius="xl"
        aria-label="Open Tafsir"
        onClick={open}>
        <IconNotes style={{ width: '70%', height: '70%' }} stroke={1.5} />
      </ActionIcon>
    </>
  );
}
