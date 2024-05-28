import React from 'react';
import { ThemeProvider } from 'styles/ThemeContext';

function Providers({ children }) {
  return (
    <>
      <ThemeProvider>{children}</ThemeProvider>
    </>
  );
}

export default Providers;
