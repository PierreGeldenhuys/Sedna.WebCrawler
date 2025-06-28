export function ConnectionStatus({ connected }: { connected: boolean }) {
  return (
    <div 
      className={`w-4 h-4 rounded-full ${
        connected ? 'bg-green-500' : 'bg-red-500'
      }`}
      title={connected ? 'Connected' : 'Disconnected'}
    />
  );
}
