import { useEffect, useRef, useState } from 'react';
import { COUNTRIES, flagEmoji } from '../data/countries.js';

export default function CountrySelect({ value, onChange }) {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState('');
  const ref = useRef(null);

  const selected = COUNTRIES.find((c) => c.code === value);
  const list = COUNTRIES.filter((c) =>
    (c.name + c.dial).toLowerCase().includes(q.toLowerCase())
  );

  useEffect(() => {
    const h = (e) => ref.current && !ref.current.contains(e.target) && setOpen(false);
    document.addEventListener('mousedown', h);
    return () => document.removeEventListener('mousedown', h);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-2 h-10 px-3 rounded-xl glass hover:bg-white/[0.08] transition-colors"
      >
        <span className="text-lg leading-none">{selected ? flagEmoji(selected.code) : '🌐'}</span>
        <span className="text-sm text-slate-300 font-medium">
          {selected ? `+${selected.dial}` : 'Country'}
        </span>
        <svg className="w-3.5 h-3.5 text-slate-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="m6 9 6 6 6-6" />
        </svg>
      </button>

      {open && (
        <div className="absolute z-30 mt-2 w-72 max-h-80 overflow-auto rounded-2xl glass shadow-2xl p-2">
          <input
            autoFocus
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search country…"
            className="w-full h-9 px-3 mb-2 rounded-lg bg-white/5 field text-sm"
          />
          {list.map((c) => (
            <button
              key={c.code}
              onClick={() => { onChange(c.code, c.dial); setOpen(false); setQ(''); }}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left text-sm hover:bg-white/10 ${
                c.code === value ? 'bg-accent/15 text-accent-soft' : 'text-slate-300'
              }`}
            >
              <span className="text-base">{flagEmoji(c.code)}</span>
              <span className="flex-1">{c.name}</span>
              <span className="text-slate-500 font-mono text-xs">+{c.dial}</span>
            </button>
          ))}
          {!list.length && <p className="px-3 py-4 text-sm text-slate-500">No match</p>}
        </div>
      )}
    </div>
  );
}
