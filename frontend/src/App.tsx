
import { ConnectionStatus } from './features/ping';
import { useConnectionStatus } from './features/ping/useConnectionStatus';
import { CrawlPage } from './features/crawl';
import './App.css';

function App() {
  const connected = useConnectionStatus();
  return (
    <div style={{ background: '#DFDFDF', minHeight: '100vh', fontFamily: 'Inter' }}>
      {/* Header */}
      <header style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        background: '#222222',
        height: '170px',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 60px',
        zIndex: 100
      }}>
        <h1 style={{
          fontFamily: 'Inter',
          fontWeight: 600,
          fontSize: '48px',
          lineHeight: '58px',
          letterSpacing: '-0.02em',
          color: '#FFFFFF',
          margin: 0
        }}>
          Sedna Crawler
        </h1>

        <div style={{ display: 'flex', alignItems: 'center', marginRight: '15px' }}>
          <ConnectionStatus key={String(connected)} connected={connected} />
        </div>
      </header>

      {/* Main Content */}
      <main>
        <CrawlPage />
      </main>
    </div>
  );
}

export default App;
