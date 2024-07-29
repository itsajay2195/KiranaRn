import {createSlice} from '@reduxjs/toolkit';

const newsSlice = createSlice({
  name: 'news',
  initialState: {
    headlines: [],
    pinnedHeadlines: [],
    currentBatch: [],
    previousCountryIndex: 0,
    loading: false,
  },
  reducers: {
    setHeadlines: (state, action) => {
      state.headlines = action.payload;
    },
    addPinnedHeadline: (state, action) => {
      state.pinnedHeadlines.push(action.payload);
    },
    removeHeadline: (state, action) => {
      state.headlines = state.headlines.filter(
        headline => headline.id !== action.payload,
      );
    },
    setCurrentBatch: (state, action) => {
      state.currentBatch = action.payload;
    },
    resetHeadlines: state => {
      state.headlines = [];
    },
    updateCountryIndex: (state, action) => {
      state.previousCountryIndex = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export const {
  setHeadlines,
  addPinnedHeadline,
  removeHeadline,
  setCurrentBatch,
  resetHeadlines,
  updateCountryIndex,
  setLoading,
} = newsSlice.actions;
export default newsSlice.reducer;
