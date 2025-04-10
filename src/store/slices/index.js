// когда слайс не имеет именновых экспортов, то еслинт начинает ругаться, хоть всё и работет
/* eslint-disable import/export */
import _userReducer from './userSlice';
import _themeReducer from './theme';

export const userReducer = _userReducer;
export * from './userSlice';

export const themeReducer = _themeReducer;
export * from './theme';

export { default as articleReducer } from './articleSlice';
