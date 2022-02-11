import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Switch, Route, useHistory, useLocation } from 'react-router-dom';
import { HeaderLayout } from '@strapi/design-system/Layout';
import { Box } from '@strapi/design-system/Box';
import ExternalLink from '@strapi/icons/ExternalLink';
import { LinkButton } from '@strapi/design-system/LinkButton';
import { Tabs, Tab, TabGroup, TabPanels, TabPanel } from '@strapi/design-system/Tabs';

import pluginId from './pluginId';
import Settings from './containers/Settings';
import ContentTypes from './containers/ContentTypes';

const PLUGIN_BASE_PATH = `/plugins/${pluginId}`;
const TABS = [
  {
    label: 'Content types',
    path: PLUGIN_BASE_PATH,
    Component: ContentTypes,
  },
  {
    label: 'Settings',
    path: `${PLUGIN_BASE_PATH}/settings`,
    Component: Settings,
  },
  {
    label: 'More settings',
    path: `${PLUGIN_BASE_PATH}/more-settings`,
    Component: Settings,
  },
];

const App = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();

  const handleTabChange = (index) => {
    history.push(TABS[index].path);
  };

  return (
    <>
      <HeaderLayout
        primaryAction={<LinkButton endIcon={<ExternalLink />} href="https://mattie-bundle.mattiebelt.com/search/plugin" >Docs</LinkButton>}
        title="Search"
        subtitle="@mattie-bundle/strapi-plugin-search" as="h2" />

      <Box paddingLeft={10} paddingRight={10}>
        <Switch>
          <TabGroup label="Some stuff for the label" id="tabs" onTabChange={(index) => handleTabChange(index)} initialSelectedTabIndex={TABS.map((tab) => tab.path).indexOf(location.pathname)}>
            <Tabs>
              { TABS.map((tab) => <Tab>{tab.label}</Tab>) }
            </Tabs>
            <TabPanels>
              {
                TABS.map((tab) => (
                  <TabPanel>
                     <Route path={tab.path} component={tab.Component} strict/>
                  </TabPanel>
                ))
              }
            </TabPanels>
          </TabGroup>
        </Switch>
      </Box>
    </>
  );
};

export default App;
