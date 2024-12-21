import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import createTree from 'utils/helpers/createTree';
import { getTitles, getTree } from 'utils/api/tree';
import authorApi from 'utils/api/author';
import { catalog } from './catalog';
import previewImage from 'images/article/preview.png';

export const initialState = {
  catalog,
  titles: null,
  updates: {
    loading: false,
    error: '',
    fetchTime: 0,
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
        // условие для фиктивных статей
        if (!action.payload.image || action.payload.image.includes('test_')) {
          state.article.publication.image = previewImage;
        }
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
        state.updates.fetchTime = Date.now();
        const dataWithLang = action.payload.map((item) => {
          for (let key in state.titles) {
            if (Object.values(state.titles[key]).includes(item.main_category)) {
              return { ...item, lang: key };
            }
          }
          return item;
        });
        if (action.meta.arg === 1) {
          state.updates.cards = dataWithLang;
          state.updates.loading = false;
          state.updates.error = '';
        } else state.updates.cards.push(...dataWithLang);
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
