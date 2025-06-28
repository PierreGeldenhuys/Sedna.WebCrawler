// store.ts - Redux store configuration
import { configureStore } from '@reduxjs/toolkit';
import { pingApi } from '../features/ping';
import { crawlApi } from '../features/crawl';

export const store = configureStore({
  reducer: {
    [pingApi.reducerPath]: pingApi.reducer,
    [crawlApi.reducerPath]: crawlApi.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      pingApi.middleware,
      crawlApi.middleware
    ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
