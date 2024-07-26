import {configureStore} from '@reduxjs/toolkit';
import newsReducer from './newsSlice';

const appstore = configureStore({
  reducer: {
    news: newsReducer,
  },
});

export default appstore;
