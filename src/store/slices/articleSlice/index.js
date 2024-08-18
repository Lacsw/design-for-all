import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import createTree from 'utils/helpers/createTree';
import { getTitles, getTree } from 'utils/api/tree';
import authorApi from 'utils/api/author';
import { catalog } from 'utils/constants';

export const initialState = {
  catalog,
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
    selectArticle: (state) => state.article,
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
        const lang = action.meta.arg;
        state.catalog[lang].titles = action.payload;
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
      });
  },
});

export const fetchTree = createAsyncThunk('tree/get', async (options) =>
  getTree(options)
);

export const fetchArticle = createAsyncThunk('article/get', async (options) =>
  authorApi.getArticleById(options)
);

export const fetchTitles = createAsyncThunk('titles/get', async (language) =>
  getTitles(language)
);

export const { selectCatalog, selectArticle, selectError, selectLoading } =
  articleSlice.selectors;

export default articleSlice.reducer;
