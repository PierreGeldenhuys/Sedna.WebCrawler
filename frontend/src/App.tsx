import { usePing, ConnectionStatus } from './features/ping';
import './App.css'

function App() {
  const { isLoading, isError, isSuccess } = usePing();
  const connected = isSuccess && !isLoading && !isError;

  return (
    <>
      {/* Full Width Header */}
      <header className="w-full bg-slate-800 py-12">
        <div className="flex items-center">
          {/* Ping Component - Round Dot with left padding */}
          <div className="pl-16">
            <ConnectionStatus connected={connected} />
          </div>
          
          {/* Sedna Crawler Text with left padding */}
          <div className="pl-12">
            <span className="text-white text-5xl font-bold">
              Sedna Crawler
            </span>
          </div>
        </div>
      </header>

      {/* Blank Main Content */}
      <main className="flex-1 bg-white">
        {/* Blank page */}
      </main>
    </>
  )
}

export default App
