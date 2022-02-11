import React, { memo } from 'react';
import { useIntl } from 'react-intl';
import { NavLink, Route, Switch } from 'react-router-dom';
import { Box } from '@strapi/design-system/Box';
import { DynamicTable } from '@strapi/helper-plugin';
import { Tbody, Tr, Td } from '@strapi/design-system/Table';
import { IconButton } from '@strapi/design-system/IconButton';
import { LinkButton } from '@strapi/design-system/LinkButton';
import { Typography } from '@strapi/design-system/Typography';
import { Flex } from '@strapi/design-system/Flex';
import { Pencil, Plus, Refresh, Trash } from '@strapi/icons';

import useSettings from '../../hooks/useSettings';
import LocalTheme from '../../components/LocalTheme';
import headers from './headers';
import ActionDialog from './ActionDialog';
import EditModal from './EditModal';

const getEntries = (contentType) => {
  return contentType.stats && contentType.stats.totalCount > 0 ? (contentType.stats.indexedCount > 0 ? `${contentType.stats.indexedCount}/${contentType.stats.totalCount}` : `0/${contentType.stats.totalCount}`) : '...'
}

const ContentTypes = ({ match, history }) => {
  const intl = useIntl()
  const { isLoading, settings } = useSettings();

  const onClose = () => {
    history.push(match.url);
  };

  return (
    <Box background="neutral0" paddingTop={1}>
      <Switch>
        <Route path={`${match.url}/content-type`} render={() => <EditModal isCreating isOpen={true} onClose={onClose} />} exact/>
        <Route path={`${match.url}/content-type/:uid/edit`} render={() => <EditModal isOpen={true} onClose={onClose} />} exact/>
        <Route path={`${match.url}/content-type/:uid/:action`} render={() => <ActionDialog isOpen={true} onClose={onClose} />} exact/>
      </Switch>

      <LocalTheme theme={{ shadows: { tableShadow: 0 }}}>
        <DynamicTable contentType="content types" headers={headers} isLoading={isLoading} withBulkActions rows={settings.contentTypes ? settings.contentTypes : []}>
          <Tbody>
          {settings.contentTypes && settings.contentTypes.map(contentType => <Tr key={contentType.uid}>
                <Td>
                  <Typography textColor="neutral800">{contentType.uid}</Typography>
                </Td>
                <Td>
                  <Typography textColor="neutral800">{contentType.index}</Typography>
                </Td>
                <Td>
                  <Typography textColor="neutral800">{new Intl.ListFormat(intl.locale, { style: 'short' }).format(contentType.fields)}</Typography>
                </Td>
                <Td>
                  <Typography textColor="neutral800">{getEntries(contentType)}</Typography>
                </Td>
                <Td>
                  <Flex justifyContent="space-between">
                    <NavLink to={`${match.url}/content-type/${contentType.uid}/edit`}>
                      <IconButton label="Edit content type configuration" noBorder icon={<Pencil />} />
                    </NavLink>
                    <NavLink to={`${match.url}/content-type/${contentType.uid}/sync`}>
                      <IconButton label="Sync index" noBorder icon={<Refresh />} />
                    </NavLink>
                    <NavLink to={`${match.url}/content-type/${contentType.uid}/delete`}>
                      <IconButton label="Delete index" noBorder icon={<Trash />} />
                    </NavLink>
                  </Flex>
                </Td>
              </Tr>)}
          </Tbody>
          {/* TODO: Replace with TFooter if DynamicTable allows a footer to be injected. */}
          <Box paddingTop={2} paddingBottom={4}>
            <LinkButton as={NavLink} variant="secondary" startIcon={<Plus />} to={`${match.url}/content-type`}>
              Index another content type
            </LinkButton>
          </Box>
        </DynamicTable>
      </LocalTheme>
    </Box>
  );
};

export default memo(ContentTypes);
