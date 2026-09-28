// Simulates chrome.storage using localStorage (same key/value model)
const PREFIX_SYNC = 'ext_sync_';
const PREFIX_LOCAL = 'ext_local_';

function pinTab() {
  const url = document.getElementById('tabUrl').value.trim();
  const title = document.getElementById('tabTitle').value.trim();
  if (!url) return;
  const tabs = getSync('pinnedTabs') || [];
  tabs.push({ url, title: title || url });
  setSync('pinnedTabs', tabs);
  document.getElementById('tabUrl').value = '';
  document.getElementById('tabTitle').value = '';
  renderTabs();
  renderRaw();
}

function renderTabs() {
  const tabs = getSync('pinnedTabs') || [];
  const list = document.getElementById('pinnedList');
  list.innerHTML = tabs.length
    ? tabs.map((t, i) => `<li><a href="${t.url}" target="_blank">${t.title}</a> <button class="btn-sm btn-bad" onclick="removeTab(${i})">✕</button></li>`).join('')
    : '<li class="empty">No pinned tabs yet</li>';
}

function removeTab(i) {
  const tabs = getSync('pinnedTabs') || [];
  tabs.splice(i, 1);
  setSync('pinnedTabs', tabs);
  renderTabs();
  renderRaw();
}

function savePref() {
  const prefs = {
    darkMode: document.getElementById('darkMode').checked,
    autoGroup: document.getElementById('autoGroup').checked,
    badges: document.getElementById('badges').checked,
  };
  setLocal('prefs', prefs);
  const msg = document.getElementById('prefMsg');
  msg.textContent = '✓ Saved to local storage';
  setTimeout(() => msg.textContent = '', 1500);
  renderRaw();
}

function clearAll() {
  Object.keys(localStorage).filter(k => k.startsWith(PREFIX_SYNC) || k.startsWith(PREFIX_LOCAL))
    .forEach(k => localStorage.removeItem(k));
  renderTabs();
  renderRaw();
}

function renderRaw() {
  const obj = {};
  for (const k of Object.keys(localStorage)) {
    if (k.startsWith(PREFIX_SYNC)) obj['[sync] ' + k.slice(PREFIX_SYNC.length)] = JSON.parse(localStorage[k]);
    if (k.startsWith(PREFIX_LOCAL)) obj['[local] ' + k.slice(PREFIX_LOCAL.length)] = JSON.parse(localStorage[k]);
  }
  document.getElementById('rawView').textContent = JSON.stringify(obj, null, 2);
}

function setSync(key, val) { localStorage.setItem(PREFIX_SYNC + key, JSON.stringify(val)); }
function getSync(key) { try { return JSON.parse(localStorage.getItem(PREFIX_SYNC + key)); } catch { return null; } }
function setLocal(key, val) { localStorage.setItem(PREFIX_LOCAL + key, JSON.stringify(val)); }
function getLocal(key) { try { return JSON.parse(localStorage.getItem(PREFIX_LOCAL + key)); } catch { return null; } }

// Init
const prefs = getLocal('prefs') || {};
document.getElementById('darkMode').checked = !!prefs.darkMode;
document.getElementById('autoGroup').checked = !!prefs.autoGroup;
document.getElementById('badges').checked = !!prefs.badges;
renderTabs();
renderRaw();
