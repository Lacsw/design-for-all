import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { articleReducer } from './slices/article';
import { themeReducer } from './slices/theme';
import { userReducer } from './slices/user';
import { catalogReducer } from './slices/catalog/slice';


const rootReducer = combineReducers({
  article: articleReducer,
  catalog: catalogReducer,
  theme: themeReducer,
  user: userReducer,
});

const persistConfig = {
  key: 'root',
  storage,
  version: 1,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).prepend(
    ),
});

export const persistor = persistStore(store);
