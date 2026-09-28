async function cacheResource() {
  const url = document.getElementById('cacheUrl').value.trim();
  const name = document.getElementById('cacheName').value.trim() || 'default';
  const msg = document.getElementById('cacheMsg');
  try {
    const response = await fetch(url);
    const cache = await caches.open(name);
    await cache.put(url, response);
    msg.textContent = `✓ Cached in "${name}"`;
    msg.style.color = '#4ade80';
  } catch (e) {
    msg.textContent = `✗ ${e.message}`;
    msg.style.color = '#f87171';
  }
}

async function readCache() {
  const url = document.getElementById('readUrl').value.trim();
  const name = document.getElementById('readCacheName').value.trim() || 'default';
  const out = document.getElementById('cacheResult');
  try {
    const cache = await caches.open(name);
    const response = await cache.match(url);
    if (!response) { out.textContent = '(not found in cache)'; return; }
    const text = await response.text();
    out.textContent = text.length > 500 ? text.slice(0, 500) + '\n…' : text;
  } catch (e) {
    out.textContent = `Error: ${e.message}`;
  }
}

async function listCaches() {
  const names = await caches.keys();
  const container = document.getElementById('cacheList');
  if (!names.length) { container.innerHTML = '<p class="empty">No caches found.</p>'; return; }
  const rows = await Promise.all(names.map(async name => {
    const cache = await caches.open(name);
    const keys = await cache.keys();
    return `<div class="cache-row">
      <strong>${name}</strong> — ${keys.length} entr${keys.length === 1 ? 'y' : 'ies'}
      <button class="btn-sm btn-bad" onclick="deleteCache('${name}')">Delete</button>
      <ul>${keys.map(r => `<li>${r.url}</li>`).join('')}</ul>
    </div>`;
  }));
  container.innerHTML = rows.join('');
}

async function deleteCache(name) {
  await caches.delete(name);
  listCaches();
}

async function deleteAllCaches() {
  const names = await caches.keys();
  await Promise.all(names.map(n => caches.delete(n)));
  listCaches();
}
