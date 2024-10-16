import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentUser: null,
  language: 'ru',
  error: null,
  loading: false,
  draft: {
    lang: '',
    main_category: '',
    sub_category: '',
    image: '',
    title: '',
    description: '',
    recommend_from_creator: [],
  },
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    signInStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    signInSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.loading = false;
      state.error = null;
    },
    signInFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    changeLanguage: (state, action) => {
      state.language = action.payload;
    },
    changeDraft: (state, action) => {
      let name = action.payload.name;
      let value = action.payload.value;
      state.draft[name] = value;
      if (name === 'lang') {
         state.draft.main_category = '';
         state.draft.recommend_from_creator = [];
      }
    },
    resetDraft: (state) => {
      state.draft = initialState.draft;
    },
  },
});

export const {
  signInStart,
  signInSuccess,
  signInFailure,
  changeLanguage,
  changeDraft,
  resetDraft,
} = userSlice.actions;

// export const userReducer = userSlice.reducer;
export default userSlice.reducer;
