import { ActionIcon, CopyButton, Modal, rem, Tooltip } from '@mantine/core';
import { IconCopy } from '@tabler/icons-react';
import { IconCheck } from '@tabler/icons-react';
import {
  FacebookIcon,
  FacebookShareButton,
  LinkedinIcon,
  LinkedinShareButton,
  TelegramIcon,
  TelegramShareButton,
  TwitterIcon,
  TwitterShareButton,
  WhatsappIcon,
  WhatsappShareButton,
} from 'react-share';
import Notify from './Notify';
import ModalSharePicture, { ModalSharePictureProps } from './ModalSharePicture';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  content: string;
  url: string;
  withPicture?: ModalSharePictureProps;
};

export default function ModalShareMedia({
  isOpen,
  onClose,
  content,
  url,
  withPicture,
}: Props) {
  return (
    <Modal
      opened={isOpen}
      onClose={onClose}
      title="Share Media"
      styles={{
        title: {
          fontWeight: 600,
        },
      }}
      centered
      radius="lg"
      transitionProps={{
        transition: 'pop',
        duration: 100,
      }}
      overlayProps={{
        backgroundOpacity: 0.2,
        blur: 1,
      }}>
      <div className="flex flex-col gap-5 px-2 pb-2">
        <div className="flex flex-col gap-3">
          <h1>Share dengan Social Media :</h1>
          <div className="flex items-center gap-3">
            <WhatsappShareButton url={content}>
              <WhatsappIcon size={35} round={true} />
            </WhatsappShareButton>
            <TelegramShareButton url={content}>
              <TelegramIcon size={35} round={true} />
            </TelegramShareButton>
            <FacebookShareButton url={url} hashtag="indoquran">
              <FacebookIcon size={35} round={true} />
            </FacebookShareButton>
            <TwitterShareButton
              url={content}
              title={content}
              hashtags={['indoquran']}>
              <TwitterIcon size={35} round={true} />
            </TwitterShareButton>
            <LinkedinShareButton url={url} summary={content} title="Indo`Quran">
              <LinkedinIcon size={35} round={true} />
            </LinkedinShareButton>
            {withPicture && (
              <ModalSharePicture {...withPicture} />
            )}
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <h1>Share dengan Link :</h1>
          <div className="rounded-md bg-gray-100 flex items-center justify-between px-3 py-2">
            <p className="text-gray-400">{url}</p>
            <CopyButton value={url} timeout={2000}>
              {({ copied, copy }) => (
                <Tooltip
                  label={copied ? 'Copied' : 'Copy'}
                  withArrow
                  position="right">
                  <ActionIcon
                    color={copied ? 'teal' : 'gray'}
                    variant="subtle"
                    onClick={() => {
                      copy();
                      Notify({
                        type: 'success',
                        message: 'Link berhasil di copy!',
                      });
                    }}>
                    {copied ? (
                      <IconCheck style={{ width: rem(16) }} />
                    ) : (
                      <IconCopy style={{ width: rem(16) }} />
                    )}
                  </ActionIcon>
                </Tooltip>
              )}
            </CopyButton>
          </div>
        </div>
      </div>
    </Modal>
  );
}
