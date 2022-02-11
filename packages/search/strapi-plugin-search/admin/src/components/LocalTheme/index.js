import React from 'react';
import { useTheme, ThemeProvider } from '@strapi/design-system/ThemeProvider';

const LocalTheme = ({ theme: localTheme, children, ...props }) => {
  const theme = useTheme();

  return (
    <ThemeProvider theme={{ ...theme, ...localTheme }}>
      {React.cloneElement(children, props)}
    </ThemeProvider>
  );
};

export default LocalTheme;
