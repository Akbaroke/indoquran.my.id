import { LOGO_INDOQURAN } from '@/assets';
import Metadata from '@/components/Metadata';
import { Button } from '@mantine/core';
import { IconHome } from '@tabler/icons-react';
import Image from 'next/image';
import { useRouter } from 'next/router';

export default function CustomError() {
  const { push } = useRouter();

  return (
    <>
      <Metadata title="404" metaDescription="Halaman Tidak Ditemukan" />
      <div className="flex flex-col gap-5 justify-center items-center my-10">
        <Image
          src={LOGO_INDOQURAN}
          alt="IndoQur`an"
          className="w-36 opacity-50"
        />
        <p className="font-medium text-md text-cPrimary">
          Halaman Tidak Ditemukan
        </p>
        <Button
          variant="light"
          color="teal"
          mt={10}
          onClick={() => push('/')}
          leftSection={<IconHome size={14} />}>
          Kembali Ke Home
        </Button>
      </div>
    </>
  );
}
