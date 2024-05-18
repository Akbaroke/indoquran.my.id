import { Drawer } from '@mantine/core';
import React from 'react';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  listMenu: {
    title: string;
    icon?: React.ReactNode;
    onClick: () => void;
  }[];
};

export default function MenuDrawer({ isOpen, onClose, listMenu }: Props) {
  return (
    <Drawer
      opened={isOpen}
      onClose={onClose}
      title="Menu"
      styles={{
        title: {
          fontWeight: 700,
        },
        header: {
          padding: '0 25px',
        },
        body: {
          padding: '0 25px',
        },
      }}
      withCloseButton={false}
      position="bottom"
      radius="lg"
      size="xs"
      overlayProps={{
        backgroundOpacity: 0.2,
        blur: 1,
      }}>
      <div className="flex flex-col gap-1">
        {listMenu?.map((item, index) => (
          <div
            key={index}
            onClick={() => {
              item.onClick();
              onClose();
            }}
            className="flex items-center gap-3 py-4 cursor-pointer border-b border-white hover:border-cWhite">
            {React.cloneElement(item.icon as React.ReactElement<any>, {
              size: 20,
              color: 'teal',
              opacity: 0.6,
            })}
            <p>{item.title}</p>
          </div>
        ))}
      </div>
    </Drawer>
  );
}
