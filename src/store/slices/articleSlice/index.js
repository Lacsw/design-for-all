import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getTree } from 'utils/api/tree';
import createTree from 'components/TestTree/createTree';

export const initialState = {
  catalog: null,
  loading: true,
  error: ''
};

const articleSlice = createSlice({
  name: 'article',
  initialState,
  reducers: {},
  selectors: {
    selectAll: (state) => state
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTree.pending, (state) => {
        state.loading = true;
        state.error = '';
      })
      .addCase(fetchTree.rejected, (state) => {
        state.loading = false;
        state.error = 'Не удалось загрузить данные';
      })
      .addCase(fetchTree.fulfilled, (state, action) => {
        state.catalog = createTree(action.payload);
        state.loading = false;
        state.error = '';
      });
  }
});

export default articleSlice.reducer;
export const fetchTree = createAsyncThunk('tree/get', async (options) => getTree(options));
export const { selectAll } = articleSlice.selectors;