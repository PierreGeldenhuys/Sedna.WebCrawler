export function ConnectionStatus({ connected }: { connected: boolean }) {
  return (
    <div 
      style={{
        width: '60px',
        height: '60px',
        borderRadius: '50%',
        backgroundColor: connected ? '#22c55e' : '#ef4444'
      }}
      title={connected ? 'Connected' : 'Disconnected'}
    />
  );
}
