import ResultCard from './ResultCard.jsx';

export default function Results({ data }) {
  if (!data) return null;

  return (
    <div className="mt-10 space-y-8">
      <p className="text-xs text-slate-500 font-mono">
        type: <span className="text-accent-soft">{data.type}</span> • {data.elapsedMs}ms
      </p>

      {data.blocks.map((block, i) => (
        <section key={i} className="space-y-3">
          <h2 className="text-lg font-semibold text-slate-100 flex items-center gap-2">
            <span className="w-1.5 h-5 rounded-full bg-accent" />
            {block.title}
          </h2>

          {/* ---- SOCIAL ---- */}
          {block.kind === 'social' && (
            <>
              <p className="text-sm text-slate-500">
                {block.data.profiles.length} profile(s) found across {block.data.checked} platforms
              </p>
              <div className="grid gap-2 sm:grid-cols-2">
                {block.data.profiles.map((p, k) => (
                  <ResultCard
                    key={k}
                    platform={p.platform}
                    title={p.profileUrl}
                    subtitle={`username: ${p.username}`}
                    url={p.profileUrl}
                  />
                ))}
              </div>
              {!block.data.profiles.length && (
                <p className="text-slate-500 text-sm">No public profile found.</p>
              )}
            </>
          )}

          {/* ---- PHONE ---- */}
          {block.kind === 'phone' && (
            <div className="grid gap-2 sm:grid-cols-2">
              {Object.entries(block.data.consensus).map(([k, v]) =>
                v ? <ResultCard key={k} platform={k} title={String(v)} /> : null
              )}
              {block.data.sources.map((s, k) => (
                <ResultCard
                  key={k}
                  platform={s.provider}
                  title={s.status === 'ok' ? (s.carrier || s.country || 'valid') : 'unavailable'}
                  subtitle={s.status === 'ok' ? `${s.lineType ?? ''} ${s.location ?? ''}`.trim() : s.error}
                />
              ))}
            </div>
          )}

          {/* ---- EMAIL ---- */}
          {block.kind === 'email' && (
            <div className="grid gap-2 sm:grid-cols-2">
              {block.data.sources.map((s, k) => (
                <ResultCard
                  key={k}
                  platform={s.provider}
                  title={s.status === 'ok' ? (s.status || s.deliverability || 'checked') : 'unavailable'}
                  subtitle={
                    s.status === 'ok'
                      ? s.breaches?.length
                        ? `${s.breaches.length} breach(es): ${s.breaches.slice(0, 3).map((b) => b.name).join(', ')}`
                        : `score ${s.score ?? s.qualityScore ?? '—'}`
                      : s.error
                  }
                />
              ))}
            </div>
          )}

          {/* ---- IMAGE ---- */}
          {block.kind === 'image' && (
            <div className="grid gap-2 sm:grid-cols-2">
              {block.data.matches.map((m, k) => (
                <ResultCard
                  key={k}
                  platform={m.platform}
                  title={m.title || m.link || 'match'}
                  subtitle={m.link}
                  url={m.link || m.sourceUrl}
                  score={m.score}
                  imageUrl={m.imageUrl}
                />
              ))}
              {!block.data.matches.length && (
                <p className="text-slate-500 text-sm">No visual match found.</p>
              )}
            </div>
          )}
        </section>
      ))}
    </div>
  );
}
