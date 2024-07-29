import {createSlice} from '@reduxjs/toolkit';

const newsSlice = createSlice({
  name: 'news',
  initialState: {
    headlines: [],
    pinnedHeadlines: [],
    currentBatch: [],
    previousCountryIndex: 0,
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
  },
});

export const {
  setHeadlines,
  addPinnedHeadline,
  removeHeadline,
  setCurrentBatch,
  resetHeadlines,
  updateCountryIndex,
} = newsSlice.actions;
export default newsSlice.reducer;
