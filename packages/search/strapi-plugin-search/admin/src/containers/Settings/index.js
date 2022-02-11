import React, { memo } from 'react';
// import PropTypes from 'prop-types';
import pluginId from '../../pluginId';
import useSettings from '../../hooks/useSettings';

const Settings = () => {
  const settings = useSettings();

  console.log(settings);

  return (
    <div>
      <h1>{pluginId}&apos;s Settings</h1>
      <p>{JSON.stringify(settings)}</p>
    </div>
  );
};

export default memo(Settings);
