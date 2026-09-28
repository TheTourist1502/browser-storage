let activeBucket = null;

const supported = 'storageBuckets' in navigator;
if (!supported) {
  document.querySelector('.note').innerHTML =
    '<strong>⚠️ Not supported in this browser.</strong> Storage Buckets requires Chrome 122+. The UI below is a simulation using prefixed localStorage.';
}

async function createBucket() {
  const name = document.getElementById('bucketName').value.trim();
  const durability = document.getElementById('bucketDurability').value;
  const msg = document.getElementById('bucketMsg');
  try {
    if (supported) {
      activeBucket = await navigator.storageBuckets.open(name, { durability, persisted: durability === 'strict' });
    } else {
      // ponytail: simulated via prefixed localStorage
      activeBucket = { name, _prefix: `bucket_${name}_` };
    }
    msg.textContent = `✓ Bucket "${name}" ready (${durability})`;
    msg.style.color = '#4ade80';
    listBuckets();
  } catch (e) {
    msg.textContent = `✗ ${e.message}`;
    msg.style.color = '#f87171';
  }
}

async function writeToBucket() {
  if (!activeBucket) { alert('Create a bucket first'); return; }
  const key = document.getElementById('writeKey').value;
  const val = document.getElementById('writeVal').value;
  if (supported) {
    const ls = await activeBucket.localStorage();
    ls.setItem(key, val);
  } else {
    localStorage.setItem(activeBucket._prefix + key, val);
  }
  document.getElementById('bucketResult').textContent = `Written: ${key} = ${val}`;
}

async function readFromBucket() {
  if (!activeBucket) { alert('Create a bucket first'); return; }
  const key = document.getElementById('writeKey').value;
  let val;
  if (supported) {
    const ls = await activeBucket.localStorage();
    val = ls.getItem(key);
  } else {
    val = localStorage.getItem(activeBucket._prefix + key);
  }
  document.getElementById('bucketResult').textContent = val !== null ? `${key} = ${val}` : '(not found)';
}

async function listBuckets() {
  const container = document.getElementById('bucketList');
  if (supported) {
    const names = await navigator.storageBuckets.keys();
    container.innerHTML = names.length
      ? names.map(n => `<div class="cache-row"><strong>${n}</strong> <button class="btn-sm btn-bad" onclick="deleteBucketByName('${n}')">Delete</button></div>`).join('')
      : '<p class="empty">No buckets.</p>';
  } else {
    const prefixes = [...new Set(
      Object.keys(localStorage).filter(k => k.startsWith('bucket_')).map(k => k.split('_')[1])
    )];
    container.innerHTML = prefixes.length
      ? prefixes.map(n => `<div class="cache-row"><strong>${n}</strong> (simulated) <button class="btn-sm btn-bad" onclick="simDeleteBucket('${n}')">Delete</button></div>`).join('')
      : '<p class="empty">No simulated buckets.</p>';
  }
}

async function deleteBucket() {
  if (!activeBucket) return;
  supported ? await navigator.storageBuckets.delete(activeBucket.name) : simDeleteBucket(activeBucket.name);
  activeBucket = null;
  document.getElementById('bucketResult').textContent = '';
  listBuckets();
}

async function deleteBucketByName(name) {
  await navigator.storageBuckets.delete(name);
  listBuckets();
}

function simDeleteBucket(name) {
  Object.keys(localStorage).filter(k => k.startsWith(`bucket_${name}_`)).forEach(k => localStorage.removeItem(k));
  listBuckets();
}
