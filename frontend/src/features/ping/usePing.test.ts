// usePing.test.ts - Test for ping hook
import { describe, it, expect, vi } from 'vitest';
import { usePing } from './usePing';
import { usePingQuery } from './pingApi';

// Mock the pingApi
vi.mock('./pingApi', () => ({
  usePingQuery: vi.fn()
}));

describe('usePing', () => {
  it('returns the result from usePingQuery', () => {
    const mockResult = {
      data: undefined,
      isLoading: true,
      isError: false,
      isSuccess: false
    };
    
    (usePingQuery as any).mockReturnValue(mockResult);
    
    const result = usePing();
    
    expect(result).toEqual(mockResult);
    expect(usePingQuery).toHaveBeenCalled();
  });
});
