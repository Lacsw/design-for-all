import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import createTree from 'utils/helpers/createTree';
import { getTitles, getTree } from 'utils/api/tree';
import authorApi from 'utils/api/author';
import { catalog } from './catalog';
import previewImage from 'images/error-image_black.jpg';

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
  isCatalogOpen: false,
  mainCategory: '',
  shouldRemountTree: false,
};

const articleSlice = createSlice({
  name: 'article',
  initialState,
  reducers: {
    setIsCatalogOpen: (state, action) => {
      state.isCatalogOpen = action.payload;
    },
    setMainCategory: (state, action) => {
      state.mainCategory = action.payload;
    },
    setShouldRemountTree: (state, action) => {
      state.shouldRemountTree = action.payload;
    },
  },
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
        if (
          !action.payload.publication?.image ||
          action.payload.publication?.image.includes('test_')
        ) {
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
        state.updates.loading = false;
        state.updates.error = '';
        if (action.meta.arg === 1) {
          state.updates.cards = action.payload;
        } else state.updates.cards.push(...action.payload);
      });
  },
});

export const { setIsCatalogOpen, setMainCategory, setShouldRemountTree } =
  articleSlice.actions;

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

export const selectIsCatalogOpen = (state) => state.article.isCatalogOpen;
export const selectMainCategory = (state) => state.article.mainCategory;
export const selectShouldRemountTree = (state) =>
  state.article.shouldRemountTree;

export default articleSlice.reducer;
