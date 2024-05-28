import React, { createContext, useCallback, useState } from 'react';
import lightThemeCssString from './theme-light.css?inline';

export const ThemeContext = createContext(null);

export function ThemeProvider({ children }) {
  const [theme, _setTheme] = useState('dark');

  const setTheme = useCallback(
    (variant) => {
      if (variant === 'light') {
        const style = document.createElement('style');
        style.type = 'text/css';
        style.id = 'theme-overidden';
        style.innerText = lightThemeCssString;

        document.head.append(style);

        style.onload = () => {
          _setTheme(variant);
        };
      } else if (variant === 'dark') {
        document.getElementById('theme-overidden').remove();
        _setTheme(variant);
      } else {
        throw new Error('Trying to switch theme, given unknown variant!');
      }
    },
    [_setTheme, lightThemeCssString]
  );

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
