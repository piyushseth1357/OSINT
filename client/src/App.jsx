import { useState } from 'react';
import { motion } from 'framer-motion';
import SearchBar from './components/SearchBar.jsx';
import Results from './components/Results.jsx';
import { runSearch } from './api.js';

export default function App() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = async (payload) => {
    setLoading(true);
    setError('');
    setData(null);
    try {
      setData(await runSearch(payload));
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <header className="px-6 py-5 flex items-center justify-between max-w-5xl w-full mx-auto">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-accent grid place-items-center text-ink-950 font-black">O</div>
          <span className="font-semibold tracking-tight">OSINT Console</span>
        </div>
        <a
          href="/api/health"
          className="text-xs font-mono text-slate-500 hover:text-accent-soft"
        >
          status
        </a>
      </header>

      <main className="flex-1 w-full max-w-5xl mx-auto px-6 pb-24">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className={data ? 'pt-6' : 'pt-24 sm:pt-32'}
        >
          {!data && (
            <div className="text-center mb-8">
              <h1 className="text-4xl sm:text-5xl font-bold tracking-tight bg-gradient-to-b from-white to-slate-400 bg-clip-text text-transparent">
                Trace anything. Publicly.
              </h1>
              <p className="mt-3 text-slate-400">
                Phone numbers, usernames, emails aur chehre — open source intelligence se ek hi jagah.
              </p>
            </div>
          )}

          <SearchBar onSearch={handleSearch} loading={loading} />
        </motion.div>

        {error && (
          <div className="mt-6 p-4 rounded-2xl border border-rose-500/30 bg-rose-500/10 text-rose-300 text-sm">
            {error}
          </div>
        )}

        <Results data={data} />
      </main>

      <footer className="px-6 py-6 text-center text-xs text-slate-600 font-mono">
        private build • keys server-side only
      </footer>
    </div>
  );
}
