export type ConnectionStatusState = true | false | 'interim';
export function ConnectionStatus({ connected }: { connected: ConnectionStatusState }) {
  let color = '#ef4444'; // red (offline)
  let title = 'Disconnected';
  if (connected === true) {
    color = '#22c55e'; // green (online)
    title = 'Connected';
  } else if (connected === 'interim') {
    color = '#a855f7'; // purple (interim)
    title = 'Connecting';
  }
  return (
    <div
      style={{
        width: '60px',
        height: '60px',
        borderRadius: '50%',
        backgroundColor: color
      }}
      title={title}
    />
  );
}
