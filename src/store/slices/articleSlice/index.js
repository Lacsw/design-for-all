import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import createTree from 'utils/helpers/createTree';
import { getTitles, getTree } from 'utils/api/tree';
import authorApi from 'utils/api/author';
import { catalog } from './catalog';

export const initialState = {
  catalog,
  titles: null,
  updates: {
    loading: false,
    error: '',
    cards: [],
  },
  article: null,
  loading: true,
  error: '',
};

const articleSlice = createSlice({
  name: 'article',
  initialState,
  reducers: {},
  selectors: {
    selectCatalog: (state) => state.catalog,
    selectTitles: (state) => state.titles,
    selectArticle: (state) => state.article,
    selectUpdates: (state) => state.updates,
    selectError: (state) => state.error,
    selectLoading: (state) => state.loading,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTree.fulfilled, (state, action) => {
        const [lang, section] = action.meta.arg.split('_');
        state.catalog[lang][section].fetchTime = Date.now();
        state.catalog[lang][section].original = action.payload;
        state.catalog[lang][section].tree = createTree(action.payload);
      })
      .addCase(fetchTitles.fulfilled, (state, action) => {
        state.titles = action.payload;
      })
      .addCase(fetchArticle.pending, (state) => {
        state.loading = true;
        state.error = '';
      })
      .addCase(fetchArticle.rejected, (state) => {
        state.loading = false;
        state.error = 'Не удалось загрузить данные';
      })
      .addCase(fetchArticle.fulfilled, (state, action) => {
        state.article = action.payload;
        state.loading = false;
        state.error = '';
      })
      .addCase(fetchUpdates.pending, (state, action) => {
        if (action.meta.arg === 1) {
          state.updates.loading = true;
          state.updates.error = '';
        }
      })
      .addCase(fetchUpdates.rejected, (state, action) => {
        if (action.meta.arg === 1) {
          state.updates.loading = false;
          state.updates.error = 'Не удалось загрузить данные';
        }
      })
      .addCase(fetchUpdates.fulfilled, (state, action) => {
        if (action.meta.arg === 1) {
          state.updates.cards = action.payload;
          state.updates.loading = false;
          state.updates.error = '';
        } else state.updates.cards.push(...action.payload);
      });
  },
});

export const fetchTree = createAsyncThunk('tree/get', async (options) =>
  getTree(options)
);

export const fetchArticle = createAsyncThunk('article/get', async (options) =>
  authorApi.getArticleById(options)
);

export const fetchUpdates = createAsyncThunk('updates/get', async (page) =>
  authorApi.getUpdates(page)
);

export const fetchTitles = createAsyncThunk('titles/get', async () =>
  getTitles()
);

export const {
  selectCatalog,
  selectTitles,
  selectArticle,
  selectUpdates,
  selectError,
  selectLoading,
} = articleSlice.selectors;

export default articleSlice.reducer;
