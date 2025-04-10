/** @returns {'dark' | 'light'} */
export const getCurrentTheme = (state) => state.theme.currentTheme;
export const getThemeError = (state) => state.theme.error;
export const getIsThemeLoading = (state) => state.theme.isLoading;
export const getThemeSuccess = (state) => state.theme.success;
export const getIsThemeLight = (state) => state.theme.currentTheme === 'light';
