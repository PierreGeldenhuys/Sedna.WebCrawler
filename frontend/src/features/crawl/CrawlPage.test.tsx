import { QueryStatus } from '@reduxjs/toolkit/query';
// CrawlPage.test.tsx - Test for crawl functionality component
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { crawlApi } from './index';

// Create a test store
const createTestStore = () => configureStore({
  reducer: {
    [crawlApi.reducerPath]: crawlApi.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(crawlApi.middleware),
});


const TestWrapper = ({ children }: { children: React.ReactNode }) => {
  const store = createTestStore();
  return <Provider store={store}>{children}</Provider>;
};


import { CrawlPage } from './CrawlPage';

describe('CrawlPage', () => {
  it('renders URL input form and submit button', () => {
    render(
      <TestWrapper>
        <CrawlPage />
      </TestWrapper>
    );
    expect(screen.getByPlaceholderText(/enter url to crawl/i)).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('shows validation error for invalid URL', async () => {
    render(
      <TestWrapper>
        <CrawlPage />
      </TestWrapper>
    );
    const urlInput = screen.getByPlaceholderText(/enter url to crawl/i);
    const submitButton = screen.getByRole('button');
    fireEvent.change(urlInput, { target: { value: 'invalid-url' } });
    fireEvent.click(submitButton);
    await waitFor(() => {
      expect(screen.getByPlaceholderText(/please enter a valid url/i)).toBeInTheDocument();
    });
  });

  it('accepts valid URLs', async () => {
    render(
      <TestWrapper>
        <CrawlPage />
      </TestWrapper>
    );
    const urlInput = screen.getByPlaceholderText(/enter url to crawl/i);
    const submitButton = screen.getByRole('button');
    fireEvent.change(urlInput, { target: { value: 'https://sedna.com' } });
    fireEvent.click(submitButton);
    // Should not show validation error for valid URL
    await waitFor(() => {
      expect(screen.queryByText(/please enter a valid url/i)).not.toBeInTheDocument();
    });
  });

  it('shows loading state when crawling', async () => {
    // Provide a custom useCrawlHook that simulates loading
    const useCrawlMock = () => [
      (((_args: any) => Promise.resolve({ data: {} })) as any),
      {
        isLoading: true,
        isError: false,
        isUninitialized: false,
        isSuccess: false,
        error: undefined,
        status: QueryStatus.pending,
        requestId: 'test',
        endpointName: 'crawl',
        startedTimeStamp: 0,
        reset: () => {}
      }
    ] as const;
    render(
      <TestWrapper>
        <CrawlPage useCrawlHook={useCrawlMock} />
      </TestWrapper>
    );
    const urlInput = screen.getByPlaceholderText(/enter url to crawl/i);
    const submitButton = screen.getByRole('button');
    fireEvent.change(urlInput, { target: { value: 'https://example.com' } });
    fireEvent.click(submitButton);
    await waitFor(() => {
      expect(submitButton).toBeDisabled();
    });
  });

  // Tests for crawl count functionality
  describe('Crawl Count Display', () => {
    it('shows empty button by default (no crawl attempted)', () => {
      render(
        <TestWrapper>
          <CrawlPage />
        </TestWrapper>
      );
      const submitButton = screen.getByRole('button');
      expect(submitButton).toHaveTextContent('');
    });

    it('shows 0 when crawl returns empty pages array', async () => {
      const useCrawlMock = () => [
        (((_args: any) => Promise.resolve({ data: { success: true, pages: [] } })) as any),
        {
          isLoading: false,
          isError: false,
          isUninitialized: false,
          isSuccess: true,
          error: undefined,
          status: QueryStatus.fulfilled,
          requestId: 'test',
          endpointName: 'crawl',
          startedTimeStamp: 0,
          fulfilledTimeStamp: 0,
          data: { success: true, pages: [] as any },
          reset: () => {}
        }
      ] as const;
      render(
        <TestWrapper>
          <CrawlPage useCrawlHook={useCrawlMock} />
        </TestWrapper>
      );
      const urlInput = screen.getByPlaceholderText(/enter url to crawl/i);
      const submitButton = screen.getByRole('button');
      fireEvent.change(urlInput, { target: { value: 'https://example.com' } });
      fireEvent.click(submitButton);
      await waitFor(() => {
        expect(submitButton).toHaveTextContent('0');
      });
    });

    it('shows page count when crawl returns pages', async () => {
      const useCrawlMock = () => [
        (((_args: any) => Promise.resolve({ data: { success: true, pages: [
          { url: 'https://example.com', title: 'Example' },
          { url: 'https://example.com/about', title: 'About' },
          { url: 'https://example.com/contact', title: 'Contact' }
        ] } })) as any),
        {
          isLoading: false,
          isError: false,
          isUninitialized: false,
          isSuccess: true,
          error: undefined,
          status: QueryStatus.fulfilled,
          requestId: 'test',
          endpointName: 'crawl',
          startedTimeStamp: 0,
          fulfilledTimeStamp: 0,
          data: { success: true, pages: [
            { url: 'https://example.com', title: 'Example' },
            { url: 'https://example.com/about', title: 'About' },
            { url: 'https://example.com/contact', title: 'Contact' }
          ] as any },
          reset: () => {}
        }
      ] as const;
      render(
        <TestWrapper>
          <CrawlPage useCrawlHook={useCrawlMock} />
        </TestWrapper>
      );
      const urlInput = screen.getByPlaceholderText(/enter url to crawl/i);
      const submitButton = screen.getByRole('button');
      fireEvent.change(urlInput, { target: { value: 'https://example.com' } });
      fireEvent.click(submitButton);
      await waitFor(() => {
        expect(submitButton).toHaveTextContent('3');
      });
    });

    it('shows 0 when crawl fails with error', async () => {
      const useCrawlMock = () => [
        (((_args: any) => Promise.resolve({ error: { message: 'Network error' } })) as any),
        {
          isLoading: false,
          isError: true,
          isUninitialized: false,
          isSuccess: false,
          error: { message: 'Network error' },
          status: QueryStatus.rejected,
          requestId: 'test',
          endpointName: 'crawl',
          startedTimeStamp: 0,
          reset: () => {}
        }
      ] as const;
      render(
        <TestWrapper>
          <CrawlPage useCrawlHook={useCrawlMock} />
        </TestWrapper>
      );
      // The placeholder should now be the default error message
      const urlInput = screen.getByPlaceholderText('An unexpected error occurred while crawling the website.');
      const submitButton = screen.getByRole('button');
      fireEvent.change(urlInput, { target: { value: 'https://example.com' } });
      fireEvent.click(submitButton);
      await waitFor(() => {
        expect(submitButton).toHaveTextContent('0');
      });
    });

    it('clears count when input changes after successful crawl', async () => {
      const useCrawlMock = () => [
        (((_args: any) => Promise.resolve({ data: { success: true, pages: [
          { url: 'https://example.com', title: 'Example' },
          { url: 'https://example.com/about', title: 'About' }
        ] } })) as any),
        {
          isLoading: false,
          isError: false,
          isUninitialized: false,
          isSuccess: true,
          error: undefined,
          status: QueryStatus.fulfilled,
          requestId: 'test',
          endpointName: 'crawl',
          startedTimeStamp: 0,
          fulfilledTimeStamp: 0,
          data: { success: true, pages: [
            { url: 'https://example.com', title: 'Example' },
            { url: 'https://example.com/about', title: 'About' }
          ] as any },
          reset: () => {}
        }
      ] as const;
      render(
        <TestWrapper>
          <CrawlPage useCrawlHook={useCrawlMock} />
        </TestWrapper>
      );
      const urlInput = screen.getByPlaceholderText(/enter url to crawl/i);
      const submitButton = screen.getByRole('button');
      // First crawl
      fireEvent.change(urlInput, { target: { value: 'https://example.com' } });
      fireEvent.click(submitButton);
      await waitFor(() => {
        expect(submitButton).toHaveTextContent('2');
      });
      // Change input - should clear count
      fireEvent.change(urlInput, { target: { value: 'https://different-site.com' } });
      await waitFor(() => {
        expect(submitButton).toHaveTextContent('');
      });
    });

    it('shows 0 when crawl returns no data', async () => {
      const useCrawlMock = () => [
        (((_args: any) => Promise.resolve({ data: {} })) as any),
        {
          isLoading: false,
          isError: false,
          isUninitialized: false,
          isSuccess: true,
          error: undefined,
          status: QueryStatus.fulfilled,
          requestId: 'test',
          endpointName: 'crawl',
          startedTimeStamp: 0,
          fulfilledTimeStamp: 0,
          data: { success: false, pages: [] as any },
          reset: () => {}
        }
      ] as const;
      render(
        <TestWrapper>
          <CrawlPage useCrawlHook={useCrawlMock} />
        </TestWrapper>
      );
      const urlInput = screen.getByPlaceholderText(/enter url to crawl/i);
      const submitButton = screen.getByRole('button');
      fireEvent.change(urlInput, { target: { value: 'https://example.com' } });
      fireEvent.click(submitButton);
      await waitFor(() => {
        expect(submitButton).toHaveTextContent('0');
      });
    });
  });
});
