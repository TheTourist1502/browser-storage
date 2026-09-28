// Safe text setter — never use innerHTML with untrusted input
function setTextSafe(element, text) {
  element.textContent = text;
}

// Minimal HTML sanitizer without a library — strips tags, keeps text
function stripTags(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML; // entities escaped, no tags
}

// Safe JSON round-trip with a size guard
const MAX_STORAGE_VALUE = 1_000_000; // 1MB per value

function safeStorageSet(key, value) {
  const serialized = JSON.stringify(value);
  if (serialized.length > MAX_STORAGE_VALUE) throw new Error('Value too large for storage');
  try {
    localStorage.setItem(key, serialized);
  } catch (e) {
    // QuotaExceededError or private mode — fail gracefully
    console.warn('localStorage unavailable:', e.message);
  }
}

function safeStorageGet(key) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

// Validate that retrieved data matches expected shape
function validateUser(data) {
  if (!data || typeof data !== 'object') return null;
  const { name, email } = data;
  if (typeof name !== 'string' || typeof email !== 'string') return null;
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) return null;
  return { name: name.slice(0, 100), email: email.slice(0, 200) };
}
