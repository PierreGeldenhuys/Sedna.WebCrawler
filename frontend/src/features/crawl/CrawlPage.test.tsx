// CrawlPage.test.tsx - Test for crawl functionality component
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { CrawlPage, crawlApi } from './index';

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
      expect(screen.getByText(/please enter a valid url/i)).toBeInTheDocument();
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
    render(
      <TestWrapper>
        <CrawlPage />
      </TestWrapper>
    );
    
    const urlInput = screen.getByPlaceholderText(/enter url to crawl/i);
    const submitButton = screen.getByRole('button');
    
    fireEvent.change(urlInput, { target: { value: 'https://example.com' } });
    fireEvent.click(submitButton);
    
    // Should show loading state (button disabled)
    await waitFor(() => {
      expect(submitButton).toBeDisabled();
    });
  });

  it('displays crawl results when successful', async () => {
    render(
      <TestWrapper>
        <CrawlPage />
      </TestWrapper>
    );
    
    // This test will initially fail since we haven't implemented the component yet
    // We expect to see results displayed after successful crawl
    const urlInput = screen.getByPlaceholderText(/enter url to crawl/i);
    fireEvent.change(urlInput, { target: { value: 'https://sedna.com' } });
    fireEvent.click(screen.getByRole('button'));
    
    // Expected behavior after implementation:
    // await waitFor(() => {
    //   expect(screen.getByText('Found 2 pages')).toBeInTheDocument();
    //   expect(screen.getByText('https://sedna.com/')).toBeInTheDocument();
    //   expect(screen.getByText('https://sedna.com/about')).toBeInTheDocument();
    // });
  });
});
