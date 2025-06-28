// store.ts - Redux store configuration
import { configureStore } from '@reduxjs/toolkit';
import { pingApi } from '../features/ping';

export const store = configureStore({
  reducer: {
    [pingApi.reducerPath]: pingApi.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(pingApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
