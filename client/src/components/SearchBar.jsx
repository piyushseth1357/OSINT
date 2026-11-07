import { useRef, useState } from 'react';
import CountrySelect from './CountrySelect.jsx';
import TypeTabs from './TypeTabs.jsx';

export default function SearchBar({ onSearch, loading }) {
  const [type, setType] = useState('auto');
  const [query, setQuery] = useState('');
  const [country, setCountry] = useState('IN');
  const [dial, setDial] = useState('91');
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const fileRef = useRef(null);

  const pickFile = (f) => {
    if (!f) return;
    setFile(f);
    setPreview(URL.createObjectURL(f));
    setType('image');
  };

  const submit = (e) => {
    e?.preventDefault();
    if (loading) return;
    if (!query.trim() && !file) return;
    onSearch({ type, query: query.trim(), country: dial, file });
  };

  return (
    <form onSubmit={submit} className="w-full">
      <div className="flex flex-wrap items-center gap-2 mb-3">
        <TypeTabs value={type} onChange={setType} />
      </div>

      <div className="glass rounded-2xl p-2 flex items-center gap-2 focus-within:shadow-glow transition-shadow">
        {/* + button */}
        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => pickFile(e.target.files?.[0])}
        />
        <button
          type="button"
          onClick={() => fileRef.current?.click()}
          title="Add image / document"
          className="shrink-0 w-10 h-10 rounded-xl bg-white/5 hover:bg-accent/20 hover:text-accent-soft text-slate-300 grid place-items-center transition-colors"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M12 5v14M5 12h14" />
          </svg>
        </button>

        {/* country */}
        {(type === 'phone' || type === 'auto') && (
          <CountrySelect
            value={country}
            onChange={(code, d) => { setCountry(code); setDial(d); }}
          />
        )}

        {/* input */}
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={
            type === 'phone' ? '98765 43210'
            : type === 'username' ? '@username'
            : type === 'email' ? 'name@domain.com'
            : type === 'image' ? 'Optional: add a name or hint'
            : 'Phone, @username, email… or drop an image'
          }
          className="field flex-1 h-10 px-2 text-base"
        />

        <button
          type="submit"
          disabled={loading}
          className="shrink-0 h-10 px-5 rounded-xl bg-accent hover:bg-accent-soft text-ink-950 font-semibold text-sm disabled:opacity-50 transition-colors"
        >
          {loading ? 'Searching…' : 'Search'}
        </button>
      </div>

      {preview && (
        <div className="mt-3 flex items-center gap-3 text-sm text-slate-400">
          <img src={preview} alt="preview" className="w-14 h-14 rounded-lg object-cover border border-white/10" />
          <span className="truncate">{file?.name}</span>
          <button
            type="button"
            onClick={() => { setFile(null); setPreview(null); }}
            className="text-rose-400 hover:text-rose-300"
          >
            remove
          </button>
        </div>
      )}
    </form>
  );
}
