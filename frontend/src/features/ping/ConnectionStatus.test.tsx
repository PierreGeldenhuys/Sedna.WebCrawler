// ConnectionStatus.test.tsx - Test for ping connection status component
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { ConnectionStatus } from './ConnectionStatus';

describe('ConnectionStatus', () => {
  it('shows green dot when connected', () => {
    render(<ConnectionStatus connected={true} />);
    
    const statusDot = screen.getByTitle('Connected');
    expect(statusDot).toBeInTheDocument();
    expect(statusDot).toHaveStyle('background-color: #22c55e');
  });

  it('shows red dot when disconnected', () => {
    render(<ConnectionStatus connected={false} />);
    
    const statusDot = screen.getByTitle('Disconnected');
    expect(statusDot).toBeInTheDocument();
    expect(statusDot).toHaveStyle('background-color: #ef4444');
  });

  it('shows red dot during loading (polling)', () => {
    // Simulate polling/loading state: connected should be false
    render(<ConnectionStatus connected={false} />);
    const statusDot = screen.getByTitle('Disconnected');
    expect(statusDot).toBeInTheDocument();
    expect(statusDot).toHaveStyle('background-color: #ef4444');
  });

  it('shows purple dot during loading (interim state)', () => {
    // Simulate interim state: connected = 'interim'
    render(<ConnectionStatus connected="interim" />);
    const statusDot = screen.getByTitle('Connecting');
    expect(statusDot).toBeInTheDocument();
    expect(statusDot).toHaveStyle('background-color: #a855f7'); // purple-500
  });
});
