import React from 'react';
import { StyledEngineProvider } from '@mui/material/styles';

/**
 * Change order of styles injection (order of tags inside <head />)\
 * Let us restyling MUI components using only CSS.
 *
 * @see https://mui.com/material-ui/integrations/interoperability/
 */
export default function GlobalCssPriority({ children }) {
  return <StyledEngineProvider injectFirst>{children}</StyledEngineProvider>;
}
