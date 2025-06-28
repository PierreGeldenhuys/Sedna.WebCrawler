// ConnectionStatus.test.tsx - Test for ping connection status component
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { ConnectionStatus } from './ConnectionStatus';

describe('ConnectionStatus', () => {
  it('shows green dot when connected', () => {
    render(<ConnectionStatus connected={true} />);
    
    const statusDot = screen.getByTitle('Connected');
    expect(statusDot).toBeInTheDocument();
    expect(statusDot).toHaveClass('bg-green-500');
  });

  it('shows red dot when disconnected', () => {
    render(<ConnectionStatus connected={false} />);
    
    const statusDot = screen.getByTitle('Disconnected');
    expect(statusDot).toBeInTheDocument();
    expect(statusDot).toHaveClass('bg-red-500');
  });
});
