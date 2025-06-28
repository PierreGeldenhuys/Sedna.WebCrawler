// crawlApi.ts - RTK Query API slice for crawl functionality
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Get API base URL from environment variable or default to localhost
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';

export interface CrawlRequest {
  url: string;
}

export interface CrawlPage {
  url: string;
  title: string;
}

export interface CrawlResponse {
  success: boolean;
  pages: CrawlPage[];
}

export const crawlApi = createApi({
  reducerPath: 'crawlApi',
  baseQuery: fetchBaseQuery({ baseUrl: API_BASE_URL }),
  endpoints: (builder) => ({
    crawlDomain: builder.mutation<CrawlResponse, CrawlRequest>({
      query: (request) => ({
        url: '/crawl',
        method: 'POST',
        body: request,
      }),
    }),
  }),
});

export const { useCrawlDomainMutation } = crawlApi;
