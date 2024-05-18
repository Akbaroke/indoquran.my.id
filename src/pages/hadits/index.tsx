import CardOptionHadits from '@/components/CardOptionHadits';
import Metadata from '@/components/Metadata';
import ListOption from '@/components/ListOption';
import { OptionHaditsModel } from '@/models/haditsModel';
import { MetadataModel } from '@/models/metadataModel';
import { getAllHadits } from '@/services/haditsService';
import { SimpleGrid, Text } from '@mantine/core';
import { useState } from 'react';

export default function Hadits({
  haditsDatas,
  metadata,
}: {
  haditsDatas: OptionHaditsModel[];
  metadata: MetadataModel;
}) {
  const [listOption, setListOption] = useState('grid');
  return (
    <>
      <Metadata {...metadata} />
      <div className="flex justify-between items-center">
        <Text fw={700} fs="italic" size="xl">
          Hadits
        </Text>
        <ListOption value={listOption} setValue={setListOption} />
      </div>
      <SimpleGrid
        className="mt-5"
        cols={listOption === 'grid' ? { base: 1, sm: 2, md: 3 } : { base: 1 }}
        spacing={{ base: 10, sm: 30 }}>
        {haditsDatas.map((item, index) => (
          <CardOptionHadits key={index} number={index + 1} {...item} />
        ))}
      </SimpleGrid>
    </>
  );
}

export async function getServerSideProps() {
  const haditsDatas = await getAllHadits();
  let metadata: MetadataModel = {};

  metadata.title = 'Hadits';

  return {
    props: {
      haditsDatas,
      metadata,
    },
  };
}
