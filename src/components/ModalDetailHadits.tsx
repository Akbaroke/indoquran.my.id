import { Loader, Modal } from '@mantine/core';
import CardHadits from './CardHadits';

type Props = {
  id: string;
  nomor: number;
  arab: string;
  arti: string;
  riwayat: string;
  isBookmark?: boolean;
  isOpen: boolean;
  onClose: () => void;
  isLoading?: boolean;
};

export default function ModalDetailHadits({
  id,
  nomor,
  arab,
  arti,
  riwayat,
  isBookmark,
  isOpen,
  onClose,
  isLoading,
}: Props) {
  return (
    <Modal
      opened={isOpen}
      onClose={onClose}
      title={isLoading ? 'Mencari data...' : `HR. ${riwayat} : ${nomor}`}
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
      {!isLoading ? (
        <div className="flex flex-col gap-5 px-2 pb-2">
          <CardHadits
            arab={arab}
            arti={arti}
            id={id}
            nomor={nomor}
            riwayat={riwayat}
            isBookmark={isBookmark}
          />
        </div>
      ) : (
        <div className="grid place-items-center my-10">
          <Loader color="teal" size="sm" />
        </div>
      )}
    </Modal>
  );
}
