import { useRef } from 'react';
import { usePing } from './index';
import type { ConnectionStatusState } from './ConnectionStatus';

export function useConnectionStatus(): ConnectionStatusState {
  const pingState = usePing();
  const lastKnown = useRef<ConnectionStatusState>(false);
  let connected: ConnectionStatusState;
  if (pingState.status === 'fulfilled') {
    connected = true;
    lastKnown.current = true;
  } else if (pingState.status === 'rejected') {
    connected = false;
    lastKnown.current = false;
  } else if (pingState.status === 'pending') {
    connected = lastKnown.current;
  } else {
    connected = false;
    lastKnown.current = false;
  }
  return connected;
}
