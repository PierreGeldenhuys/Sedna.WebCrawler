// usePing.ts - RTK Query hook for ping
import { usePingQuery } from './pingApi';

export const usePing = () => {
  // Poll every 5 seconds for connection status
  return usePingQuery(undefined, { pollingInterval: 5000 });
};
