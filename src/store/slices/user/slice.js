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
  original: {
    sub_category: '',
    title: '',
    image: '',
    description: '',
    recommend_from_creator: [],
  },
  decision: {},
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
      if (name === 'lang' && !state.draft.what_update) {
        state.draft.main_category = '';
        state.draft.recommend_from_creator = [];
      }
    },
    prepareDraft: (state, action) => {
      Object.assign(state.draft, action.payload);
    },
    resetDraft: (state) => {
      state.draft = initialState.draft;
    },
    addOriginal: (state, action) => {
      action.payload &&
        Object.keys(state.original).forEach(
          (key) => (state.original[key] = action.payload[key]) || ''
        );
    },
    setDecision: (state, action) => {
      state.decision = action.payload;
    },
    signOut: (state) => {
      state.currentUser = null;
      state.loading = false;
      state.error = null;
    },
  },
});

export const {
  signInStart,
  signInSuccess,
  signInFailure,
  changeLanguage,
  changeDraft,
  prepareDraft,
  resetDraft,
  addOriginal,
  setDecision,
  signOut,
} = userSlice.actions;

export const userReducer = userSlice.reducer;
