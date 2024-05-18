import { IMAGE_PROFILE_INDOQURAN } from '@/assets';
import { Button, Checkbox, Modal } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconCircleCheckFilled } from '@tabler/icons-react';
import { IconPhoto } from '@tabler/icons-react';
import Image from 'next/image';
import { useRef, useState } from 'react';
import Transition from './Transition';
import { IconDownload } from '@tabler/icons-react';
//@ts-ignore
import * as htmlToImage from 'html-to-image';
import { saveAs } from 'file-saver';
import moment from 'moment';
import Notify from './Notify';

export type ModalSharePictureProps = {
  sumber: string;
  arab: string;
  arti: string;
};

export default function ModalSharePicture({
  sumber,
  arab,
  arti,
}: ModalSharePictureProps) {
  const [opened, { open, close }] = useDisclosure(false);
  const [checkArab, setCheckArab] = useState(true);
  const [checkArti, setCheckArti] = useState(true);
  const [checkSumber, setCheckSumber] = useState(true);

  const refJpg = useRef(null);
  const refPng = useRef(null);

  const downloadImage = (ref: any, filename: string, extension: string) => {
    const element = ref.current;
    if (!element) {
      console.error('Element reference is null');
      return;
    }

    htmlToImage
      .toBlob(element)
      .then(function (blob: any) {
        if (blob) {
          saveAs(blob, `${filename}.${extension}`);
          Notify({
            type: 'success',
            message: 'Download berhasil!',
          });
        } else {
          // console.error('Failed to convert element to blob');
        }
      })
      .catch(function (error: any) {
        // console.error('Error during image generation:', error);
      });
  };

  const time = moment(new Date()).format('DD.MM.YY_HH.mm.ss');

  return (
    <>
      <Modal
        opened={opened}
        onClose={close}
        title="Share Gambar"
        styles={{
          title: {
            fontWeight: 600,
          },
        }}
        centered
        size="auto"
        radius="lg"
        transitionProps={{
          transition: 'pop',
          duration: 100,
        }}
        overlayProps={{
          backgroundOpacity: 0.2,
          blur: 1,
        }}>
        <div
          className="bg-[#eefaf6] rounded-xl py-20 sm:py-40 px-5 sm:px-10 gird place-items-center"
          ref={refJpg}>
          <div
            className="shadow-2xl rounded-xl bg-white min-w-[280px] max-w-[700px] p-7"
            ref={refPng}>
            <div className="flex items-center gap-3">
              <Image
                src={IMAGE_PROFILE_INDOQURAN}
                alt="Profile IndoQur`an"
                className="w-16 border rounded-full"
              />
              <div className="flex flex-col">
                <div className="flex items-center gap-3">
                  <h1 className="font-bold text-lg">IndoQur`an</h1>
                  <IconCircleCheckFilled className="text-blue-500" size={16} />
                </div>
                <p className="text-gray-500">@indoquran.my.id</p>
              </div>
            </div>
            <div className="flex flex-col gap-10 p-5">
              <Transition opened={checkArab} transition="fade">
                <p
                  className="font-arab text-xl md:text-2xl font-semibold text-end transition-all duration-300"
                  style={{
                    lineHeight: 2.5,
                  }}>
                  {arab}
                </p>
              </Transition>
              <div>
                <Transition opened={checkArti} transition="fade">
                  <p className="text-[15px] md:text-[17px] text-justify mb-1">
                    {arti}
                  </p>
                </Transition>
                <Transition opened={checkSumber} transition="fade">
                  <b>{sumber}</b>
                </Transition>
              </div>
            </div>
          </div>
        </div>
        <div className="flex gap-2 px-5">
          <div className="flex flex-col gap-3 bg-white rounded-lg p-5 w-max">
            <Checkbox
              label="Arab"
              styles={{
                label: {
                  fontWeight: 500,
                },
              }}
              checked={checkArab}
              onChange={(event) => setCheckArab(event.currentTarget.checked)}
            />
            <Checkbox
              label="Arti"
              styles={{
                label: {
                  fontWeight: 500,
                },
              }}
              checked={checkArti}
              onChange={(event) => setCheckArti(event.currentTarget.checked)}
            />
            <Checkbox
              label="Title"
              styles={{
                label: {
                  fontWeight: 500,
                },
              }}
              checked={checkSumber}
              onChange={(event) => setCheckSumber(event.currentTarget.checked)}
            />
          </div>
          <div className="bg-white rounded-lg p-5 flex items-center justify-center gap-5 w-full flex-wrap">
            <Button
              variant="outline"
              rightSection={<IconDownload size={14} />}
              onClick={() =>
                downloadImage(refPng, `indoquran_${sumber}_${time}`, 'png')
              }>
              Download PNG
            </Button>
            <Button
              variant="filled"
              rightSection={<IconDownload size={14} />}
              onClick={() =>
                downloadImage(refJpg, `indoquran_${sumber}_${time}`, 'jpg')
              }>
              Download JPG
            </Button>
          </div>
        </div>
      </Modal>

      <button
        onClick={open}
        className="p-2 rounded-full bg-cPrimary/80 text-white">
        <IconPhoto size={19} />
      </button>
    </>
  );
}
