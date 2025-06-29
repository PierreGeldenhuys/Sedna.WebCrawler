// CrawlPage.tsx - Component for crawling websites

import React, { useState } from 'react';
import { useCrawl as defaultUseCrawl } from './useCrawl';
import type { CrawlPage as CrawlPageType, CrawlResponse } from './crawlApi';


export interface CrawlPageProps {
  useCrawlHook?: typeof defaultUseCrawl;
}

export function CrawlPage({ useCrawlHook = defaultUseCrawl }: CrawlPageProps = {}) {
  const [url, setUrl] = useState('');
  const [validationError, setValidationError] = useState('');
  const [crawlData, setCrawlData] = useState<CrawlResponse | null>(null);
  const [hasAttemptedCrawl, setHasAttemptedCrawl] = useState(false);
  const [crawlDomain, { isLoading, isError, error }] = useCrawlHook();

  const validateUrl = (inputUrl: string): boolean => {
    try {
      new URL(inputUrl);
      return inputUrl.startsWith('http://') || inputUrl.startsWith('https://');
    } catch {
      return false;
    }
  };

  const handleSubmit = async () => {
    if (!validateUrl(url)) {
      setValidationError('Please enter a valid URL');
      return;
    }
    
    setValidationError('');
    setHasAttemptedCrawl(true);
    try {
      const result = await crawlDomain({ url });
      if ('data' in result && result.data) {
        setCrawlData(result.data);
      } else {
        // API call succeeded but no data returned
        setCrawlData(null);
      }
    } catch (err) {
      // Error occurred, set crawlData to null so we show "0"
      setCrawlData(null);
    }
  };

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUrl(e.target.value);
    if (validationError) {
      setValidationError('');
    }
    // Clear crawl data and reset attempt state when input changes
    if (hasAttemptedCrawl) {
      setCrawlData(null);
      setHasAttemptedCrawl(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  return (
    <>
      {/* Fixed Crawl Button */}
      <button
        onClick={handleSubmit}
        disabled={isLoading}
        style={{
          position: 'fixed',
          top: '230px',
          right: '75px',
          fontFamily: 'Inter',
          fontSize: '16px',
          fontWeight: 600,
          width: '60px',
          height: '60px',
          background: isLoading 
            ? 'linear-gradient(45deg, #ef4444, #4CAF50)' 
            : url 
              ? '#4CAF50' 
              : '#ef4444',
          color: '#FFFFFF',
          border: 'none',
          borderRadius: '50%',
          cursor: isLoading ? 'not-allowed' : 'pointer',
          opacity: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
          transition: isLoading 
            ? 'background 2s ease-in-out' 
            : 'background-color 0.4s ease',
          transform: 'translateZ(0)',
          animation: isLoading 
            ? 'colorTransition 2s ease-in-out infinite' 
            : 'none'
        }}
      >
        {hasAttemptedCrawl && !isLoading
          ? (crawlData && Array.isArray(crawlData.pages)
              ? crawlData.pages.length
              : '0')
          : ''}
      </button>

      {/* Fixed Input Section */}
      <div style={{
        position: 'fixed',
        top: '170px',
        left: 0,
        right: 0,
        background: '#DFDFDF',
        height: '170px',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 60px',
        zIndex: 99
      }}>
        <input
          type="text"
          value={url}
          onChange={handleUrlChange}
          onKeyPress={handleKeyPress}
          placeholder={
            validationError || 
            (isError && (error && 'data' in error ? (error.data as string) : 'An unexpected error occurred while crawling the website.')) || 
            "Enter URL to crawl"
          }
          style={{
            fontFamily: 'Inter',
            fontWeight: 600,
            fontSize: '48px',
            lineHeight: '58px',
            letterSpacing: '-0.02em',
            padding: '15px 20px',
            border: 'none',
            background: '#DFDFDF',
            width: '900px', // widened input
            outline: 'none',
            color: (validationError || isError) ? '#dc3545' : '#222222',
            marginLeft: '-20px'
          }}
        />
      </div>

      {/* Scrollable Results Area */}
      <div style={{
        marginTop: '340px',
        background: '#DFDFDF',
        minHeight: 'calc(100vh - 340px)',
        padding: '0 60px 60px 60px'
      }}>
        {/* Results Display */}
        {crawlData && Array.isArray(crawlData.pages) && (
          <div>
            {crawlData.pages.map((page: CrawlPageType, index: number) => (
              <div 
                key={index} 
                style={{
                  background: index % 2 === 0 ? '#D9D9D9' : '#DFDFDF',
                  height: '170px',
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  padding: '0 60px'
                }}
              >
                <div style={{
                  fontFamily: 'Inter',
                  fontWeight: 600,
                  fontSize: '24px',
                  lineHeight: '30px',
                  letterSpacing: '-0.02em',
                  color: '#222222',
                  display: 'flex',
                  alignItems: 'center',
                  width: '100%',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap'
                }}>
                  <span style={{ marginRight: '20px' }}>{index + 1}</span>
                  <span style={{ marginRight: '20px' }}>|</span>
                  <a 
                    href={page.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    style={{
                      color: '#222222',
                      textDecoration: 'underline',
                      marginRight: '20px',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                      maxWidth: '400px'
                    }}
                  >
                    {page.url}
                  </a>
                  <span style={{ marginRight: '20px' }}>|</span>
                  <span style={{
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                    flex: 1
                  }}>
                    {page.title || 'No title'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
