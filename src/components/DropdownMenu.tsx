import { ActionIcon, FloatingPosition, Menu } from '@mantine/core';
import { IconDots } from '@tabler/icons-react';

type Props = {
  className?: string;
  position?: FloatingPosition;
  listMenu: {
    title: string;
    icon?: React.ReactNode;
    onClick: () => void;
  }[];
};

export default function DropdownMenu({ className, position, listMenu }: Props) {
  return (
    <Menu
      withArrow
      shadow="sm"
      position={position}
      offset={-3}
      radius={8}
      transitionProps={{ transition: 'fade', duration: 300 }}>
      <Menu.Target>
        <ActionIcon
          variant="subtle"
          radius="xl"
          aria-label="menu"
          className={className}>
          <IconDots style={{ width: '70%', height: '70%' }} stroke={1.5} />
        </ActionIcon>
      </Menu.Target>

      <Menu.Dropdown>
        {listMenu.map((item, index) => (
          <Menu.Item key={index} leftSection={item.icon} onClick={item.onClick}>
            {item.title}
          </Menu.Item>
        ))}
      </Menu.Dropdown>
    </Menu>
  );
}
