import React, { memo } from 'react';
import { Box } from '@strapi/design-system/Box';
import { EmptyBodyTable } from '@strapi/helper-plugin';
import { Table, Thead, Tbody, Tr, Td, Th, TFooter } from '@strapi/design-system/Table';
import { IconButton } from '@strapi/design-system/IconButton';
import { BaseCheckbox } from '@strapi/design-system/BaseCheckbox';
import { Typography } from '@strapi/design-system/Typography';
import { Flex } from '@strapi/design-system/Flex';
import { Plus, CarretDown, Pencil, Trash } from '@strapi/icons';

import LocalTheme from '../../components/LocalTheme';

const ContentTypes = () => {
  const COL_COUNT = 10;
  const ROW_COUNT = 5;
  const contentType = {
    uid: 'api::episode.episode',
    index: 'episode',
    fields: ['id', 'title', 'subtitle', 'description', 'duration', 'type', 'keyWords', 'showNotes', 'podcast', 'hosts', 'quests'],
  };
  const entries = [];

  for (let i = 0; i < 5; i++) {
    entries.push({...contentType, id: i});
  }


  return (
    <Box background="neutral0" paddingTop="1">
      <LocalTheme theme={{ shadows: { tableShadow: 0 }}}>
        <Table colCount={COL_COUNT} rowCount={ROW_COUNT} footer={<TFooter icon={<Plus />}>Add another field to this collection type</TFooter>}>
          <Thead>
            <Tr>
              <Th>
                <BaseCheckbox aria-label="Select all entries" />
              </Th>
              <Th action={<IconButton label="Sort on ID" icon={<CarretDown />} noBorder />}>
                <Typography variant="sigma">Content type</Typography>
              </Th>
              <Th>
                <Typography variant="sigma">Index</Typography>
              </Th>
              <Th>
                <Typography variant="sigma">Fields</Typography>
              </Th>
              <Th>
                <Typography variant="sigma">Entries</Typography>
              </Th>
              <Th>
                <Typography variant="sigma">Actions</Typography>
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            {entries.map(row => <Tr key={row.id}>
                <Td>
                  <BaseCheckbox aria-label={`Select ${row.uid}`} />
                </Td>
                <Td>
                  <Typography textColor="neutral800">{row.uid}</Typography>
                </Td>
                <Td>
                  <Typography textColor="neutral800">{row.index}</Typography>
                </Td>
                <Td>
                  <Typography textColor="neutral800">{new Intl.ListFormat('en').format(row.fields)}</Typography>
                </Td>
                <Td>
                  <Flex>
                    <IconButton onClick={() => console.log('edit')} label="Edit" noBorder icon={<Pencil />} />
                    <Box paddingLeft={1}>
                      <IconButton onClick={() => console.log('delete')} label="Delete" noBorder icon={<Trash />} />
                    </Box>
                  </Flex>
                </Td>
              </Tr>)}
          </Tbody>
        </Table>
      </LocalTheme>
    </Box>
  );
};

export default memo(ContentTypes);
