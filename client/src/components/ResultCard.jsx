export default function ResultCard({ platform, title, subtitle, url, score, imageUrl }) {
  const Wrapper = url ? 'a' : 'div';
  return (
    <Wrapper
      {...(url ? { href: url, target: '_blank', rel: 'noopener noreferrer' } : {})}
      className="group flex items-center gap-4 p-4 rounded-2xl glass hover:bg-white/[0.07] transition-colors"
    >
      {imageUrl ? (
        <img src={imageUrl} alt="" className="w-12 h-12 rounded-xl object-cover border border-white/10" />
      ) : (
        <div className="w-12 h-12 rounded-xl bg-accent/15 text-accent-soft grid place-items-center font-bold text-lg">
          {platform?.[0]?.toUpperCase() ?? '?'}
        </div>
      )}

      <div className="min-w-0 flex-1">
        <p className="text-[11px] uppercase tracking-widest text-accent-soft/80 font-semibold">
          {platform}
        </p>
        <p className="truncate font-medium text-slate-100 group-hover:text-white">
          {title}
        </p>
        {subtitle && <p className="truncate text-sm text-slate-500">{subtitle}</p>}
      </div>

      {typeof score === 'number' && (
        <span className="shrink-0 text-xs font-mono px-2 py-1 rounded-lg bg-emerald-500/15 text-emerald-300">
          {Math.round(score)}%
        </span>
      )}
      {url && (
        <svg className="w-4 h-4 text-slate-600 group-hover:text-accent-soft shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M7 17 17 7M7 7h10v10" />
        </svg>
      )}
    </Wrapper>
  );
}
