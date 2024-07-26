import {createSlice} from '@reduxjs/toolkit';

const newsSlice = createSlice({
  name: 'news',
  initialState: {
    headlines: [],
    pinnedHeadlines: [],
    currentBatch: [],
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
  },
});

export const {
  setHeadlines,
  addPinnedHeadline,
  removeHeadline,
  setCurrentBatch,
  resetHeadlines,
} = newsSlice.actions;
export default newsSlice.reducer;
