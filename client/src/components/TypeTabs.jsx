const TYPES = [
  { id: 'auto', label: 'Auto', icon: '✨' },
  { id: 'phone', label: 'Phone', icon: '📞' },
  { id: 'username', label: 'Username', icon: '@' },
  { id: 'email', label: 'Email', icon: '✉' },
  { id: 'image', label: 'Face / Image', icon: '🖼' },
];

export default function TypeTabs({ value, onChange }) {
  return (
    <div className="flex flex-wrap gap-2">
      {TYPES.map((t) => (
        <button
          key={t.id}
          onClick={() => onChange(t.id)}
          className={`chip ${
            value === t.id
              ? 'bg-accent/20 border-accent/50 text-accent-soft shadow-glow'
              : 'glass text-slate-400 hover:text-slate-200 hover:bg-white/[0.08]'
          }`}
        >
          <span className="mr-1.5">{t.icon}</span>
          {t.label}
        </button>
      ))}
    </div>
  );
}
