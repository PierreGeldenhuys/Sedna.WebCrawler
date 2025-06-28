// CrawlPage.tsx - Component for crawling websites
import React, { useState } from 'react';
import { useCrawl } from './useCrawl';
import type { CrawlPage as CrawlPageType } from './crawlApi';

export function CrawlPage() {
  const [url, setUrl] = useState('');
  const [validationError, setValidationError] = useState('');
  const [crawlDomain, { data, isLoading, isError, error }] = useCrawl();

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
    await crawlDomain({ url });
  };

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUrl(e.target.value);
    if (validationError) {
      setValidationError('');
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
          placeholder="Enter URL to crawl"
          style={{
            fontFamily: 'Inter',
            fontWeight: 600,
            fontSize: '48px',
            lineHeight: '58px',
            letterSpacing: '-0.02em',
            padding: '15px 20px',
            border: 'none',
            background: '#DFDFDF',
            width: '600px',
            outline: 'none',
            color: '#222222',
            marginLeft: '-20px'
          }}
        />
        
        <div style={{ display: 'flex', alignItems: 'center', marginRight: '15px' }}>
          {validationError && (
            <p style={{
              fontFamily: 'Inter',
              fontSize: '16px',
              color: '#dc3545',
              margin: 0
            }}>
              {validationError}
            </p>
          )}
        </div>
      </div>

      {/* Error Display (if needed, positioned below input) */}
      {isError && (
        <div style={{
          position: 'fixed',
          top: '340px',
          left: '60px',
          right: '60px',
          background: '#f8d7da',
          border: '1px solid #f5c6cb',
          borderRadius: '8px',
          padding: '20px',
          zIndex: 98
        }}>
          <p style={{
            fontFamily: 'Inter',
            fontSize: '18px',
            color: '#721c24',
            margin: 0
          }}>
            Error: {error && 'data' in error ? (error.data as string) : 'An unexpected error occurred while crawling the website.'}
          </p>
        </div>
      )}

      {/* Scrollable Results Area */}
      <div style={{
        marginTop: '340px',
        background: '#DFDFDF',
        minHeight: 'calc(100vh - 340px)',
        padding: '0 60px 60px 60px'
      }}>
        {/* Results Display */}
        {data && (
          <div>
            {data.pages.map((page: CrawlPageType, index: number) => (
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
