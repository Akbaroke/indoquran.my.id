import { JadwalSholatModel } from '@/models/jadwalSholatModel';
import { Table } from '@mantine/core';

type Props = {
  data: JadwalSholatModel;
};

export default function TableJadwal({ data }: Props) {
  const ths = (
    <Table.Tr>
      <Table.Th
        styles={{
          th: {
            textAlign: 'center',
          },
        }}>
        Jadwal
      </Table.Th>
      <Table.Th
        styles={{
          th: {
            textAlign: 'center',
          },
        }}>
        Waktu
      </Table.Th>
    </Table.Tr>
  );

  return (
    <Table striped highlightOnHover withTableBorder withColumnBorders>
      <Table.Thead>{ths}</Table.Thead>
      <Table.Tbody>
        <Table.Tr>
          <Table.Td>Imsak</Table.Td>
          <Table.Td>{data.imsak}</Table.Td>
        </Table.Tr>
        <Table.Tr>
          <Table.Td>Subuh</Table.Td>
          <Table.Td>{data.subuh}</Table.Td>
        </Table.Tr>
        <Table.Tr>
          <Table.Td>Dhuha</Table.Td>
          <Table.Td>{data.dhuha}</Table.Td>
        </Table.Tr>
        <Table.Tr>
          <Table.Td>Dzuhur</Table.Td>
          <Table.Td>{data.dzuhur}</Table.Td>
        </Table.Tr>
        <Table.Tr>
          <Table.Td>Ashar</Table.Td>
          <Table.Td>{data.ashar}</Table.Td>
        </Table.Tr>
        <Table.Tr>
          <Table.Td>Magrib</Table.Td>
          <Table.Td>{data.maghrib}</Table.Td>
        </Table.Tr>
        <Table.Tr>
          <Table.Td>Isya</Table.Td>
          <Table.Td>{data.isya}</Table.Td>
        </Table.Tr>
      </Table.Tbody>
    </Table>
  );
}
