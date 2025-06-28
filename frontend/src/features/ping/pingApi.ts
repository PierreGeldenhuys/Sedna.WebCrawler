// pingApi.ts - RTK Query API slice for ping
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Get API base URL from environment variable or default to localhost
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';

export const pingApi = createApi({
  reducerPath: 'pingApi',
  baseQuery: fetchBaseQuery({ baseUrl: API_BASE_URL }),
  endpoints: (builder) => ({
    ping: builder.query<number, void>({
      query: () => '/ping',
    }),
  }),
});

export const { usePingQuery } = pingApi;
