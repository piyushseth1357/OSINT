const BASE = import.meta.env.VITE_API_URL || '';

export async function runSearch({ type, query, country, file }) {
  const fd = new FormData();
  fd.append('type', type);
  if (query) fd.append('query', query);
  if (country) fd.append('country', country);
  if (file) fd.append('file', file);

  const res = await fetch(`${BASE}/api/search`, { method: 'POST', body: fd });
  const json = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(json.error || `Request failed (${res.status})`);
  return json;
}
