import { createAsyncThunk, createSlice, createSelector } from '@reduxjs/toolkit';
import createTree from 'utils/helpers/createTree';
import treeApi from 'utils/api/tree';
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
    hasMore: true,
    isEndReached: false,
    currentPage: 1
  },
  articleId: null,
  article: null,
  loading: true,
  error: ''
};

const articleSlice = createSlice({
  name: 'article',
  initialState,
  reducers: {},
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
        state.articleId = action.meta.arg.articleId; 
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
      .addCase(fetchUpdates.pending, (state) => {
        state.updates.loading = true;
        state.updates.error = '';
      })
      .addCase(fetchUpdates.fulfilled, (state, action) => {
        state.updates.fetchTime = Date.now();
        state.updates.loading = false;
        state.updates.error = '';
        state.updates.currentPage = action.meta.arg;

        // Проверяем, что данные существуют
        if (!action.payload || action.payload.length === 0) {
          state.updates.hasMore = false;
          state.updates.isEndReached = true;
          return;
        }

        // Если получили меньше 20 элементов, значит это последняя страница
        if (action.payload.length < 20) {
          state.updates.hasMore = false;
          state.updates.isEndReached = true;
        } else {
          // Если получили полную страницу, значит есть ещё данные
          state.updates.hasMore = true;
          state.updates.isEndReached = false;
        }

        if (action.meta.arg === 1) {
          state.updates.cards = action.payload;
        } else {
          state.updates.cards = [...state.updates.cards, ...action.payload];
        }
      })
      .addCase(fetchUpdates.rejected, (state, action) => {
        state.updates.loading = false;
        
        // action.payload будет содержать errorData из handleResponse
        const errorData = action.payload || action.error;
        state.updates.error = errorData.message;

        // Проверяем статус из errorData
        if (errorData.status === 404) {
          state.updates.hasMore = false;
          state.updates.isEndReached = true;
        }
      });
  },
});

export const fetchTree = createAsyncThunk('tree/get', async (options) =>
  treeApi.getTree(options)
);

export const fetchArticle = createAsyncThunk('article/get', async (options) =>
  authorApi.getArticleById(options)
);

export const fetchUpdates = createAsyncThunk('updates/get', async (page) =>
  authorApi.getUpdates(page)
);

export const fetchTitles = createAsyncThunk('titles/get', async () =>
  treeApi.getTitles()
);

// Селекторы
export const selectCatalog = (state) => state.article.catalog;
export const selectTitles = (state) => state.article.titles;
export const selectArticle = (state) => state.article.article;
export const selectUpdates = (state) => state.article.updates;
export const selectError = (state) => state.article.error;
export const selectLoading = (state) => state.article.loading;
export const selectArticleId = (state) => state.article.articleId;


export const selectUpdatesError = createSelector(
  [(state) => state.article.updates.error, 
   (state) => state.article.updates.isEndReached,
   (state) => state.article.updates.hasMore],
  (error, isEndReached, hasMore) => ({
    error,
    isEndReached,
    canRetry: hasMore
  })
);

export const articleReducer = articleSlice.reducer;
