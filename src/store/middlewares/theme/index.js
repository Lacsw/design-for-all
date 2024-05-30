import { createAsyncThunk } from '@reduxjs/toolkit';
import lightThemeCssString from '/src/styles/theme-light.css?inline';

export const setTheme = createAsyncThunk('theme/set', (payload) => {
  return new Promise((resolve, reject) => {
    if (payload === 'light') {
      const headEl = document.querySelector('head');

      if (!headEl.querySelector('#theme-overidden')) {
        const style = document.createElement('style');
        style.type = 'text/css';
        style.id = 'theme-overidden';
        style.innerText = lightThemeCssString;

        headEl.append(style);

        style.onload = () => {
          resolve(payload);
        };
        style.onerror = () => {
          reject(new Error('Error: failed to load theme css-file!'));
        };
      } else {
        resolve(payload);
      }
    } else if (payload === 'dark') {
      const ElOfNotDefaultTheme = document.getElementById('theme-overidden');
      if (ElOfNotDefaultTheme) {
        ElOfNotDefaultTheme.remove();
        resolve(payload);
      } else {
        reject(
          new Error(
            'Trying to remove styles of not default theme, coresponding style#theme-overidden not found!'
          )
        );
      }
    } else {
      reject(
        new Error(`Trying to switch theme, given unknown variant "${payload}"`)
      );
    }
  });
});
