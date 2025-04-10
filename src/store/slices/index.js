// когда слайс не имеет именновых экспортов, то еслинт начинает ругаться, хоть всё и работет
/* eslint-disable import/export */
import _userReducer from './userSlice';

export const userReducer = _userReducer;
export * from './userSlice';

export { default as articleReducer } from './articleSlice';
